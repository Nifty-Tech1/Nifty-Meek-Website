import { getServerSupabase } from "../../lib/auth";

export const dynamic = "force-dynamic";

export default async function ProjectsPreview() {
  const supabase = await getServerSupabase();

  const { data: projects, error } = await supabase.from("projects").select("*");

  if (error) {
    return <p className="text-red-400 p-10">Failed to load projects</p>;
  }

  if (!projects) {
    return <p className="text-gray-400 p-10">Loading...</p>;
  }

  return (
    <section className="px-10 py-20">
      <h2 className="text-3xl font-bold mb-10">Active Systems</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-6 rounded-2xl bg-linear-to-br from-white/5 to-white/0 border border-white/10"
          >
            <h3 className="text-xl font-semibold">{project.name}</h3>

            <p className="text-gray-400 mt-2">{project.description}</p>

            <span className="text-sm mt-4 inline-block text-green-400">
              ● {project.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
