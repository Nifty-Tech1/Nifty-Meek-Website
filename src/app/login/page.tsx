"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");

  const login = async () => {
    await supabase.auth.signInWithOtp({ email });
    alert("Check your email for login link");
  };

  return (
    <div className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      {/* Background Glow */}

      <h1 className="text-2xl mb-4">Login</h1>
      <input
        className="w-full p-3 text-white bg-slate-800 rounded-2xl"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button
        onClick={login}
        className="px-8 py-4 bg-white text-black rounded-2xl hover:scale-105 transition cursor-pointer"
      >
        Send Magic Link
      </button>
    </div>
  );
}
