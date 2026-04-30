"use client";

import { useState, useRef } from "react";
import { uploadImageAction } from "@/lib/actions";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ImageUploadProps {
  projectId: string;
  onSuccess?: (image: any) => void;
}

export default function ImageUpload({
  projectId,
  onSuccess,
}: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("development");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate size
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File too large. Max 10MB");
      return;
    }

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "video/mp4"];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Invalid file type");
      return;
    }

    setFile(selectedFile);

    // Preview
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Select a file");
      return;
    }

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    setLoading(true);
    setProgress(30);

    try {
      setProgress(60);
      const result = await uploadImageAction({
        file,
        title,
        description,
        projectId,
        category,
      });

      if (!result.success) {
        toast.error(result.error || "Upload failed");
        return;
      }

      setProgress(100);
      toast.success("Image uploaded successfully!");

      // Reset form
      setFile(null);
      setPreview("");
      setTitle("");
      setDescription("");
      setProgress(0);

      if (fileInputRef.current) fileInputRef.current.value = "";
      onSuccess?.(result.image);
    } catch (error) {
      toast.error("Upload error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-4 sm:p-6 border border-border-color w-full max-w-xl mx-auto"
    >
      <h3 className="text-lg font-semibold mb-5">Upload Media</h3>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* FILE UPLOAD */}
        <div>
          <label className="block text-sm text-text-secondary mb-3">
            Image or Video
          </label>

          <div className="relative border-2 border-dashed border-accent/30 rounded-xl p-6 sm:p-8 text-center hover:border-accent/60 transition cursor-pointer bg-white/5">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              disabled={loading}
              accept="image/*,video/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            {preview ? (
              <div className="space-y-3">
                {file?.type.startsWith("image/") && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-44 sm:max-h-52 mx-auto rounded-lg object-cover"
                  />
                )}
                <p className="text-xs sm:text-sm text-text-secondary truncate px-2">
                  {file?.name}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-3xl sm:text-4xl">📸</p>
                <p className="text-sm sm:text-base text-text-primary font-medium">
                  Click or drag to upload
                </p>
                <p className="text-xs text-text-secondary">
                  Max 10MB • JPG, PNG, WebP, MP4
                </p>
              </div>
            )}
          </div>
        </div>

        {/* TITLE */}
        <div>
          <label className="block text-sm text-text-secondary mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            placeholder="e.g., Product Launch Day"
            className="w-full p-3 bg-surface rounded-lg border border-border-color text-text-primary focus:border-accent outline-none"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm text-text-secondary mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            placeholder="What happened?"
            rows={3}
            className="w-full p-3 bg-surface rounded-lg border border-border-color text-text-primary focus:border-accent outline-none resize-none"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block text-sm text-text-secondary mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
            className="w-full p-3 bg-surface rounded-lg border border-border-color text-text-primary focus:border-accent outline-none"
          >
            <option value="development">Development</option>
            <option value="launch">Launch</option>
            <option value="architecture">Architecture</option>
            <option value="team">Team</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* PROGRESS */}
        {loading && (
          <div className="space-y-2">
            <div className="h-2 bg-surface rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-text-secondary text-center">
              {progress}% uploading...
            </p>
          </div>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={!file || loading}
          className="w-full p-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </motion.div>
  );
}
