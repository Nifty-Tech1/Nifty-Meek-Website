"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const statusConfig = {
  Live: {
    color: "bg-green-500/10",
    textColor: "text-green-400",
    dotColor: "bg-green-500",
    label: "Live",
  },
  Building: {
    color: "bg-accent/10",
    textColor: "text-accent",
    dotColor: "bg-accent",
    label: "Building",
  },
  Experiment: {
    color: "bg-purple-500/10",
    textColor: "text-purple-400",
    dotColor: "bg-purple-500",
    label: "Experiment",
  },
};

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  created_at?: string;
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return (
      <section className="relative px-6 md:px-8 py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-xl p-12 border border-border-color text-center">
            <p className="text-text-secondary mb-4">No projects yet.</p>
            <Link
              href="/admin"
              className="text-accent hover:underline font-semibold"
            >
              Create the first one →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative px-6 md:px-8 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => {
            const config =
              statusConfig[project.status as keyof typeof statusConfig] ||
              statusConfig.Experiment;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative glass rounded-xl p-6 border border-border-color hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all cursor-pointer"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold group-hover:gradient-text transition-all">
                        {project.name}
                      </h3>
                      <p className="text-text-secondary text-sm mt-2">
                        {project.description}
                      </p>
                    </div>
                    <div
                      className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-semibold border flex items-center gap-2 ${config.color} ${config.textColor}`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${config.dotColor}`}
                      />
                      {config.label}
                    </div>
                  </div>

                  {/* Timeline & Tech */}
                  <div className="mt-6 pt-6 border-t border-border-color flex flex-col gap-2">
                    <div className="text-xs text-text-tertiary">
                      Status:{" "}
                      <span className="text-text-secondary">
                        {project.status}
                      </span>
                    </div>
                    {project.created_at && (
                      <div className="text-xs text-text-tertiary">
                        Created:{" "}
                        <span className="text-text-secondary">
                          {new Date(project.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-accent">→</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
