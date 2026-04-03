"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function NewProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Building");

  const createProject = async () => {
    await supabase.from("projects").insert([{ name, description, status }]);
    alert("Project created");
  };

  return (
    <div className="p-10 max-w-lg">
      <h1 className="text-2xl mb-6">New Project</h1>

      <input
        className="w-full p-3 mb-4 text-black"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full p-3 mb-4 text-black"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="w-full p-3 mb-4 text-black"
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Building</option>
        <option>Live</option>
        <option>Experiment</option>
      </select>

      <button onClick={createProject} className="px-6 py-3 bg-white text-black">
        Create
      </button>
    </div>
  );
}
