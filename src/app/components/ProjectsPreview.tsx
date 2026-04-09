"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getSupabase } from "../../lib/supabase";

const statusColors = {
  Live: "from-green-500/20 to-green-500/5 border-green-500/30 text-green-400",
  Building: "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400",
  Experiment:
    "from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400",
};

export default function ProjectsPreview() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const supabase = getSupabase();
        const { data, error: err } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(6);

        if (err) {
          setError(err.message);
        } else {
          setProjects(data || []);
        }
      } catch (e) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return (
      <section className="px-6 md:px-8 py-20">
        <div className="max-w-7xl mx-auto text-center text-red-400">
          {error}
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="px-6 md:px-8 py-20">
        <div className="max-w-7xl mx-auto text-center text-text-secondary">
          Loading projects...
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <section className="px-6 md:px-8 py-20">
        <div className="max-w-7xl mx-auto text-center text-text-secondary">
          No projects yet. Check back soon!
        </div>
      </section>
    );
  }

  return (
    <section className="relative px-6 md:px-8 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-medium text-text-secondary">
              Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Active Systems
          </h2>
          <p className="text-text-secondary max-w-2xl">
            Real projects, real impact. Building systems that scale across
            markets and solve real problems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="glass rounded-2xl p-6 h-full hover:border-accent/50 transition-all duration-300 flex flex-col">
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-lg border bg-gradient-to-br ${
                      statusColors[
                        project.status as keyof typeof statusColors
                      ] ||
                      "from-gray-500/20 to-gray-500/5 border-gray-500/30 text-gray-400"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                    {project.status}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:gradient-text transition-all">
                  {project.name}
                </h3>

                <p className="text-text-secondary text-sm mb-6 flex-1 line-clamp-3">
                  {project.description}
                </p>

                {/* View All Link */}
                <div className="flex items-center justify-between pt-4 border-t border-border-color">
                  <span className="text-xs text-text-tertiary">
                    {new Date(project.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <svg
                    className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 flex justify-center">
          <Link href="/projects">
            <button className="px-8 py-3 rounded-xl font-semibold border border-border-color text-text-primary hover:bg-surface-light transition-all">
              View All Projects
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
