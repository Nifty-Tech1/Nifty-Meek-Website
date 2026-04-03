import { getServerSupabase } from "../../lib/auth";
import ReactMarkdown from "react-markdown";

export const dynamic = "force-dynamic";

export default async function LogsPreview() {
  const supabase = await getServerSupabase();

  const { data: logs } = await supabase
    .from("logs")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <section className="px-10 py-24 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-16 text-center">Build Timeline</h2>

      <div className="relative border-l border-white/10 pl-10 space-y-16">
        {logs?.map((log) => (
          <div key={log.id} className="relative">
            {/* Dot */}
            <div className="absolute -left-[42px] top-2 w-4 h-4 bg-white rounded-full" />

            {/* Card */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold">{log.title}</h3>

                <span className="text-xs px-3 py-1 rounded-full bg-white/10">
                  {log.tag}
                </span>
              </div>

              <div className="prose prose-invert max-w-none text-gray-300">
                <ReactMarkdown>{log.content}</ReactMarkdown>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                {new Date(log.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
