"use client";
import { useState } from "react";
import { getSupabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "Building" | "Live" | "Experiment";
}

const VALID_STATUSES = ["Building", "Live", "Experiment"] as const;
type Status = (typeof VALID_STATUSES)[number];

export default function AdminProjectItem({ project }: { project: Project }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState<Status>(project.status);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = (): boolean => {
    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }

    if (!description.trim()) {
      toast.error("Description is required");
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

  const updateProject = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const supabase = getSupabase();

      const { error } = await supabase
        .from("projects")
        .update({
          name: name.trim(),
          description: description.trim(),
          status,
        })
        .eq("id", project.id);

      if (error) {
        toast.error("Failed to update project");
        return;
      }

      toast.success("Project updated successfully");
      setEditing(false);
      router.refresh();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async () => {
    const confirmDelete = confirm("Are you sure? This cannot be undone.");
    if (!confirmDelete) return;

    setLoading(true);

    try {
      const supabase = getSupabase();

      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", project.id);

      if (error) {
        toast.error("Failed to delete project");
        return;
      }

      toast.success("Project deleted");
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4 hover:border-white/20 transition">
      {editing ? (
        <>
          <div>
            <label className="text-sm text-white/70 block mb-2">Name</label>
            <input
              className="w-full p-2 bg-slate-700 text-white rounded border border-white/20 focus:border-white/30 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              maxLength={200}
            />
          </div>

          <div>
            <label className="text-sm text-white/70 block mb-2">
              Description
            </label>
            <textarea
              className="w-full p-2 bg-slate-700 text-white rounded border border-white/20 focus:border-white/30 focus:outline-none resize-none h-20"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              maxLength={2000}
            />
          </div>

          <div>
            <label className="text-sm text-white/70 block mb-2">Status</label>
            <select
              className="w-full p-2 bg-slate-700 text-white rounded border border-white/20 focus:border-white/30 focus:outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              disabled={loading}
            >
              <option value="Building">Building</option>
              <option value="Live">Live</option>
              <option value="Experiment">Experiment</option>
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={updateProject}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-500/20 text-green-300 border border-green-500/50 rounded hover:bg-green-500/30 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setName(project.name);
                setDescription(project.description);
                setStatus(project.status);
              }}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-white/10 text-white border border-white/20 rounded hover:bg-white/20 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <h2 className="font-semibold text-lg">{project.name}</h2>
            <p className="text-white/60 text-sm mt-2">{project.description}</p>
            <span className="inline-block text-xs mt-3 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
              {project.status}
            </span>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setEditing(true)}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-500/20 text-blue-300 border border-blue-500/50 rounded hover:bg-blue-500/30 disabled:opacity-50"
            >
              Edit
            </button>

            <button
              onClick={deleteProject}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/50 rounded hover:bg-red-500/30 disabled:opacity-50"
            >
              {loading ? "..." : "Delete"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
