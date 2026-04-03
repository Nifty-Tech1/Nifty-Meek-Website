"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminProjectItem({ project }: any) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);
  const router = useRouter();

  const updateProject = async () => {
    await supabase
      .from("projects")
      .update({ name, description, status })
      .eq("id", project.id);

    setEditing(false);
  };

  const deleteProject = async () => {
    const confirmDelete = confirm("Delete this project?");
    if (!confirmDelete) return;

    await supabase.from("projects").delete().eq("id", project.id);

    router.refresh();
  };

  return (
    <div className="p-4 border rounded space-y-2">
      {editing ? (
        <>
          <input
            className="w-full p-2 text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full p-2 text-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full p-2 text-black"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Building</option>
            <option>Live</option>
            <option>Experiment</option>
          </select>

          <button onClick={updateProject} className="px-4 py-2 bg-green-500">
            Save
          </button>
        </>
      ) : (
        <>
          <h2 className="font-semibold">{project.name}</h2>
          <p className="text-gray-400">{project.description}</p>
          <span className="text-sm">● {project.status}</span>
        </>
      )}

      <div className="flex gap-3 mt-2">
        <button onClick={() => setEditing(!editing)} className="text-blue-400">
          {editing ? "Cancel" : "Edit"}
        </button>

        <button onClick={deleteProject} className="text-red-400">
          Delete
        </button>
      </div>
    </div>
  );
}
