"use client";
import { useState } from "react";
import { getSupabase } from "../../../../lib/supabase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const VALID_TAGS = ["update", "experiment", "win", "failure"] as const;
type Tag = (typeof VALID_TAGS)[number];

export default function NewLog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<Tag>("update");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = (): boolean => {
    if (!title.trim()) {
      toast.error("Title is required");
      return false;
    }

    if (!content.trim()) {
      toast.error("Content is required");
      return false;
    }

    if (title.length > 500) {
      toast.error("Title must be less than 500 characters");
      return false;
    }

    if (content.length > 10000) {
      toast.error("Content must be less than 10,000 characters");
      return false;
    }

    if (!VALID_TAGS.includes(tag as Tag)) {
      toast.error("Invalid tag selected");
      return false;
    }

    return true;
  };

  const createLog = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("logs").insert([
        {
          title: title.trim(),
          content: content.trim(),
          tag,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Database error:", error);
        toast.error(error.message || "Failed to create log. Please try again.");
        return;
      }

      toast.success("Log created successfully 🚀");
      // Reset form
      setTitle("");
      setContent("");
      setTag("update");

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

  return (
    <div className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="w-full max-w-lg p-10 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-2">New Log Entry</h1>
        <p className="text-white/60 mb-8">Share what's happening</p>

        <div className="space-y-4">
          <div className="text-left">
            <label className="text-sm text-white/70 block mb-2">Title</label>
            <input
              className="w-full p-3 text-white bg-slate-800 rounded-2xl border border-white/10 focus:border-white/30 focus:outline-none transition"
              placeholder="What's the title?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              maxLength={500}
            />
            <p className="text-xs text-white/40 mt-1">
              {title.length}/500 characters
            </p>
          </div>

          <div className="text-left">
            <label className="text-sm text-white/70 block mb-2">Content</label>
            <textarea
              className="w-full p-3 text-white bg-slate-800 rounded-2xl border border-white/10 focus:border-white/30 focus:outline-none transition h-32 resize-none"
              placeholder="Tell the full story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              maxLength={10000}
            />
            <p className="text-xs text-white/40 mt-1">
              {content.length}/10,000 characters
            </p>
          </div>

          <div className="text-left">
            <label className="text-sm text-white/70 block mb-2">Tag</label>
            <select
              className="w-full px-4 py-2 bg-slate-800 text-white rounded-2xl border border-white/10 focus:border-white/30 focus:outline-none transition"
              value={tag}
              onChange={(e) => setTag(e.target.value as Tag)}
              disabled={loading}
            >
              <option value="update">📢 Update</option>
              <option value="experiment">🧪 Experiment</option>
              <option value="win">🎯 Win</option>
              <option value="failure">❌ Failure</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              disabled={loading}
              onClick={createLog}
              className="flex-1 px-8 py-3 bg-white text-black rounded-2xl font-semibold hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Creating..." : "Create Log"}
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
