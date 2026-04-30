import { v2 as cloudinary } from "cloudinary";

// Configure on server-side only
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  file: File,
  folder: string = "nifty-meek",
) {
  try {
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder, // Cloudinary folder organization
          resource_type: "auto", // auto-detect image/video
          quality: "auto", // Smart compression
          flags: "progressive", // Progressive JPEG
          timeout: 60000, // 60 second timeout
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      // End the stream
      stream.end(buffer);
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(
      `Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function deleteFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw new Error("Failed to delete image");
  }
}
