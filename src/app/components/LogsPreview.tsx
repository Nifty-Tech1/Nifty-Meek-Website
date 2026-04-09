"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "../../lib/supabase";

export default function LogsPreview() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();

    const fetchLogs = async () => {
      const { data } = await supabase
        .from("logs")
        .select("*")
        .order("created_at", { ascending: false });

      setLogs(data || []);
      setLoading(false);
    };

    fetchLogs();

    const channel = supabase
      .channel("logs-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "logs" },
        () => {
          fetchLogs();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="px-10 py-20">
      <h2 className="text-3xl font-bold mb-10">Build Logs</h2>

      {/* ✅ Loading */}
      {loading && <p className="text-gray-400">Loading logs...</p>}

      {/* ✅ Empty state */}
      {!loading && logs.length === 0 && (
        <p className="text-gray-500">No logs yet.</p>
      )}

      {/* ✅ Logs */}
      <div className="space-y-6 max-w-2xl mx-auto">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur hover:border-white/20 transition"
          >
            <h3 className="font-semibold">{log.title}</h3>

            <p className="text-gray-400 mt-2">{log.content}</p>

            <span className="text-xs text-gray-500 mt-3 block">
              {new Date(log.created_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
