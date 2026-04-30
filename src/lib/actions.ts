"use server";

import { revalidatePath } from "next/cache";
import { getServerSupabase } from "./auth";
import { uploadToCloudinary, deleteFromCloudinary } from "./cloudinary";

interface UploadImageInput {
  file: File;
  title: string;
  description: string;
  projectId: string;
  category?: string;
  altText?: string;
}

export async function uploadImageAction(input: UploadImageInput) {
  try {
    // ✅ STRICT VALIDATION
    if (!input?.file) throw new Error("File missing");
    if (!input?.projectId) throw new Error("Project ID missing");
    if (!input?.title?.trim()) throw new Error("Title required");

    const safeProjectId = input.projectId.replace(/[^a-zA-Z0-9-_]/g, "").trim();

    if (!safeProjectId) {
      throw new Error("Invalid project ID");
    }

    const supabase = await getServerSupabase();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");

    // ✅ FILE VALIDATION
    const MAX_SIZE = 10 * 1024 * 1024;
    const ALLOWED_TYPES = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "video/mp4",
      "video/webm",
    ];

    if (input.file.size > MAX_SIZE) {
      throw new Error("File too large (max 10MB)");
    }

    if (!ALLOWED_TYPES.includes(input.file.type)) {
      throw new Error(`Unsupported file type: ${input.file.type}`);
    }

    // ✅ SAFE FOLDER
    const folderPath = `nifty-meek/${safeProjectId}`;

    // 🚀 UPLOAD TO CLOUDINARY
    const cloudinaryResult = await uploadToCloudinary(input.file, folderPath);

    if (!cloudinaryResult?.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    // 💾 SAVE TO DB
    const { data, error } = await supabase
      .from("images")
      .insert({
        public_id: cloudinaryResult.public_id,
        secure_url: cloudinaryResult.secure_url,
        resource_type: cloudinaryResult.resource_type,
        original_filename: `${Date.now()}-${input.file.name}`, // ✅ prevents collisions
        file_size: input.file.size,
        width: cloudinaryResult.width || null,
        height: cloudinaryResult.height || null,
        format: cloudinaryResult.format || null,
        project_id: safeProjectId,
        uploaded_by: user.id,
        title: input.title.trim(),
        description: input.description?.trim() || "",
        category: input.category || "general",
        alt_text: input.altText || "",
      })
      .select("*")
      .single();

    if (error) {
      await deleteFromCloudinary(cloudinaryResult.public_id);
      throw new Error(`Database error: ${error.message}`);
    }

    revalidatePath("/");
    revalidatePath("/projects");

    return { success: true, image: data };
  } catch (error: any) {
    console.error("UPLOAD ERROR FULL:", {
      message: error?.message,
      stack: error?.stack,
      projectId: input?.projectId,
      fileType: input?.file?.type,
      size: input?.file?.size,
    });

    return {
      success: false,
      error: error?.message || "Upload failed",
    };
  }
}

// Delete image from Cloudinary AND Supabase
export async function deleteImageAction(imageId: string) {
  try {
    const supabase = await getServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");

    // Get image to verify ownership
    const { data: image } = await supabase
      .from("images")
      .select("*")
      .eq("id", imageId)
      .single();

    if (!image) throw new Error("Image not found");
    if (image.uploaded_by !== user.id) throw new Error("Unauthorized");

    // Delete from Cloudinary first
    await deleteFromCloudinary(image.public_id);

    // Delete from Supabase
    const { error } = await supabase.from("images").delete().eq("id", imageId);

    if (error) throw new Error(`Failed to delete: ${error.message}`);

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delete failed";
    console.error("Delete action error:", message);
    return { success: false, error: message };
  }
}

// ============ ACHIEVEMENTS ============

export async function getAchievementsAction() {
  try {
    const supabase = await getServerSupabase();

    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .order("order_position", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    // Calculate overall progress
    const completed = data.filter((a) => a.status === "completed").length;
    const overallProgress =
      data.length > 0 ? Math.round((completed / data.length) * 100) : 0;

    return {
      success: true,
      achievements: data,
      stats: {
        total: data.length,
        completed,
        inProgress: data.filter((a) => a.status === "in-progress").length,
        planned: data.filter((a) => a.status === "planned").length,
        overallProgress,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch";
    console.error("Get achievements error:", message);
    return { success: false, error: message, achievements: [], stats: null };
  }
}

interface CreateAchievementInput {
  title: string;
  description: string;
  category: string;
  targetDate?: string;
  status?: "planned" | "in-progress" | "completed";
}

export async function createAchievementAction(input: CreateAchievementInput) {
  try {
    const supabase = await getServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");

    // Get next order position
    const { data: lastAchievement } = await supabase
      .from("achievements")
      .select("order_position")
      .order("order_position", { ascending: false })
      .limit(1);

    const nextPosition = (lastAchievement?.[0]?.order_position ?? 0) + 1;

    const { data, error } = await supabase
      .from("achievements")
      .insert({
        title: input.title,
        description: input.description,
        category: input.category,
        status: input.status || "planned",
        target_date: input.targetDate ? new Date(input.targetDate) : null,
        order_position: nextPosition,
        created_by: user.id,
        progress_percent: input.status === "completed" ? 100 : 0,
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/");
    return { success: true, achievement: data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Creation failed";
    console.error("Create achievement error:", message);
    return { success: false, error: message };
  }
}

export async function updateAchievementAction(
  id: string,
  updates: Partial<CreateAchievementInput> & { progress_percent?: number },
) {
  try {
    const supabase = await getServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");

    // Verify ownership
    const { data: achievement } = await supabase
      .from("achievements")
      .select("created_by")
      .eq("id", id)
      .single();

    if (achievement?.created_by !== user.id) throw new Error("Unauthorized");

    const { data, error } = await supabase
      .from("achievements")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/");
    return { success: true, achievement: data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Update failed";
    console.error("Update achievement error:", message);
    return { success: false, error: message };
  }
}

export async function deleteAchievementAction(id: string) {
  try {
    const supabase = await getServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");

    // Verify ownership
    const { data: achievement } = await supabase
      .from("achievements")
      .select("created_by")
      .eq("id", id)
      .single();

    if (achievement?.created_by !== user.id) throw new Error("Unauthorized");

    const { error } = await supabase.from("achievements").delete().eq("id", id);

    if (error) throw new Error(error.message);

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delete failed";
    console.error("Delete achievement error:", message);
    return { success: false, error: message };
  }
}
