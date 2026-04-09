"use client";
import { useState, useEffect } from "react";
import { getSupabase } from "../../../lib/supabase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const VALID_STATUSES = ["Building", "Live", "Experiment"] as const;
type Status = (typeof VALID_STATUSES)[number];

export default function NewProject() {
  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("Building");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated (client-side check)
    const checkAuth = async () => {
      const supabase = getSupabase();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setAuthenticated(true);
    };

    checkAuth();
  }, [router]);

  const validateForm = (): boolean => {
    if (!name.trim()) {
      toast.error("Project name is required");
      return false;
    }

    if (!description.trim()) {
      toast.error("Project description is required");
      return false;
    }

    if (name.length > 200) {
      toast.error("Name must be less than 200 characters");
      return false;
    }

    if (description.length > 2000) {
      toast.error("Description must be less than 2,000 characters");
      return false;
    }

    return true;
  };

  const createProject = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("projects").insert([
        {
          name: name.trim(),
          description: description.trim(),
          status,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Database error:", error);
        toast.error(
          error.message || "Failed to create project. Please try again.",
        );
        return;
      }

      toast.success("Project created successfully! 🚀");

      // Reset form
      setName("");
      setDescription("");
      setStatus("Building");

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="w-full max-w-lg p-10 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-2">New Project</h1>
        <p className="text-white/60 mb-8">Showcase your latest work</p>

        <div className="space-y-4">
          <div className="text-left">
            <label className="text-sm text-white/70 block mb-2">Name</label>
            <input
              className="w-full p-3 text-white bg-slate-800 rounded-2xl border border-white/10 focus:border-white/30 focus:outline-none transition"
              placeholder="Project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              maxLength={200}
            />
            <p className="text-xs text-white/40 mt-1">
              {name.length}/200 characters
            </p>
          </div>

          <div className="text-left">
            <label className="text-sm text-white/70 block mb-2">
              Description
            </label>
            <textarea
              className="w-full p-3 text-white bg-slate-800 rounded-2xl border border-white/10 focus:border-white/30 focus:outline-none transition h-32 resize-none"
              placeholder="Project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              maxLength={2000}
            />
            <p className="text-xs text-white/40 mt-1">
              {description.length}/2,000 characters
            </p>
          </div>

          <div className="text-left">
            <label className="text-sm text-white/70 block mb-2">Status</label>
            <select
              className="w-full px-4 py-2 bg-slate-800 text-white rounded-2xl border border-white/10 focus:border-white/30 focus:outline-none transition"
              onChange={(e) => setStatus(e.target.value as Status)}
              value={status}
              disabled={loading}
            >
              <option value="Building">🔨 Building</option>
              <option value="Live">✨ Live</option>
              <option value="Experiment">🧪 Experiment</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              disabled={loading}
              onClick={createProject}
              className="flex-1 px-8 py-3 bg-white text-black rounded-2xl font-semibold hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Creating..." : "Create Project"}
            </button>
            <button
              disabled={loading}
              onClick={() => router.back()}
              className="px-8 py-3 bg-white/10 text-white rounded-2xl font-semibold hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
