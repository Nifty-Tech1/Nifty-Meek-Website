"use client";
import { useState } from "react";
import { supabase } from "../../../../lib/supabase";

export default function NewLog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("update");

  const createLog = async () => {
    await supabase.from("logs").insert([{ title, content, tag }]);
    alert("Log created");
  };

  return (
    <div className="p-10 max-w-lg">
      <h1 className="text-2xl mb-6">New Log</h1>

      <input
        className="w-full p-3 mb-4 text-black"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full p-3 mb-4 text-black"
        placeholder="What happened today?"
        onChange={(e) => setContent(e.target.value)}
      />

      <select onChange={(e) => setTag(e.target.value)}>
        <option value="update">Update</option>
        <option value="experiment">Experiment</option>
        <option value="win">Win</option>
        <option value="failure">Failure</option>
      </select>

      <button onClick={createLog} className="px-6 py-3 bg-white text-black">
        Create
      </button>
    </div>
  );
}
