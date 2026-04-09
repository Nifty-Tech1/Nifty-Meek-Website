"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface Milestone {
  id: number;
  title: string;
  description: string;
  date: string;
  status: "completed" | "in-progress" | "planned";
  progress: number;
  category: string;
}

const milestones: Milestone[] = [
  {
    id: 1,
    title: "Foundation Built",
    description: "Core infrastructure and systems established",
    date: "Q1 2024",
    status: "completed",
    progress: 100,
    category: "Infrastructure",
  },
  {
    id: 2,
    title: "Alpha Launch",
    description: "First version shipped to early users",
    date: "Q2 2024",
    status: "completed",
    progress: 100,
    category: "Launch",
  },
  {
    id: 3,
    title: "Scale to 5k Users",
    description: "Growing user base and global reach",
    date: "Q3 2024",
    status: "in-progress",
    progress: 65,
    category: "Growth",
  },
  {
    id: 4,
    title: "Enterprise Features",
    description: "Advanced features for enterprise clients",
    date: "Q4 2024",
    status: "in-progress",
    progress: 40,
    category: "Development",
  },
  {
    id: 5,
    title: "Global Expansion",
    description: "Multi-region deployment and localization",
    date: "Q1 2025",
    status: "planned",
    progress: 0,
    category: "Expansion",
  },
  {
    id: 6,
    title: "$1M ARR",
    description: "Achieving sustainable revenue milestone",
    date: "Q2 2025",
    status: "planned",
    progress: 0,
    category: "Revenue",
  },
];

const statusConfig = {
  completed: {
    color: "bg-green-500",
    textColor: "text-green-400",
    label: "Completed",
  },
  "in-progress": {
    color: "bg-accent",
    textColor: "text-accent",
    label: "In Progress",
  },
  planned: {
    color: "bg-text-tertiary",
    textColor: "text-text-tertiary",
    label: "Planned",
  },
};

export default function ProgressDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["All", ...new Set(milestones.map((m) => m.category))];

  const filteredMilestones =
    selectedCategory && selectedCategory !== "All"
      ? milestones.filter((m) => m.category === selectedCategory)
      : milestones;

  const completedCount = milestones.filter(
    (m) => m.status === "completed",
  ).length;
  const averageProgress =
    Math.round(
      milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length,
    ) || 0;

  return (
    <section className="relative px-6 md:px-8 py-24 overflow-hidden">
      {/* Background Blob */}
      <div className="blob w-96 h-96 bg-blue-500/20 -top-48 -left-48" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-text-secondary">
              Roadmap
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Journey to Scale
          </h2>
          <p className="text-text-secondary max-w-2xl">
            Transparent milestones tracking our path from launch to scaling
            globally.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-6"
          >
            <div className="text-3xl font-bold gradient-text mb-2">
              {completedCount}/{milestones.length}
            </div>
            <p className="text-text-secondary text-sm">Milestones Completed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="text-3xl font-bold gradient-text mb-2">
              {averageProgress}%
            </div>
            <p className="text-text-secondary text-sm">Average Progress</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-6"
          >
            <div className="text-3xl font-bold gradient-text mb-2">
              {milestones.filter((m) => m.status === "in-progress").length}
            </div>
            <p className="text-text-secondary text-sm">Current Focus Areas</p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() =>
                setSelectedCategory(
                  category === "All"
                    ? null
                    : category === selectedCategory
                      ? null
                      : category,
                )
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                (category === "All" && !selectedCategory) ||
                category === selectedCategory
                  ? "bg-accent text-white"
                  : "border border-border-color text-text-secondary hover:border-accent/50"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Milestones Timeline */}
        <div className="space-y-4">
          {filteredMilestones.map((milestone, idx) => {
            const config = statusConfig[milestone.status];

            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass rounded-xl p-6 hover:border-accent/50 transition-all group"
              >
                <div className="flex gap-6">
                  {/* Timeline Dot */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      whileInView={{
                        scale: 1,
                        boxShadow:
                          milestone.status === "completed"
                            ? "0 0 20px rgba(0, 102, 255, 0.5)"
                            : "0 0 0px rgba(0, 102, 255, 0)",
                      }}
                      className={`w-4 h-4 rounded-full ${config.color} flex-shrink-0 mt-2`}
                    />
                    {idx !== filteredMilestones.length - 1 && (
                      <div
                        className={`w-1 h-12 ${
                          milestone.status === "completed"
                            ? "bg-green-500/50"
                            : milestone.status === "in-progress"
                              ? "bg-accent/50"
                              : "bg-text-tertiary/30"
                        }`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-4 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold group-hover:gradient-text transition-all">
                          {milestone.title}
                        </h3>
                        <p className="text-text-secondary text-sm mt-1">
                          {milestone.description}
                        </p>
                      </div>
                      <div className="flex gap-3 mt-3 md:mt-0">
                        <span className="text-xs font-medium text-text-tertiary">
                          {milestone.date}
                        </span>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-lg border whitespace-nowrap ${
                            config.textColor
                          } ${
                            milestone.status === "completed"
                              ? "border-green-500/50 bg-green-500/10"
                              : milestone.status === "in-progress"
                                ? "border-accent/50 bg-accent/10"
                                : "border-text-tertiary/30 bg-text-tertiary/5"
                          }`}
                        >
                          {config.label}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-surface-light rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${milestone.progress}%` }}
                          transition={{ delay: 0.2, duration: 0.8 }}
                          className={`h-full rounded-full ${config.color}`}
                        />
                      </div>
                      <span className="text-xs font-medium text-text-secondary w-12 text-right">
                        {milestone.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 text-center"
        >
          <p className="text-text-secondary mb-4">
            Want to follow the journey more closely?
          </p>
          <a
            href="/blog"
            className="inline-block px-6 py-3 rounded-xl font-semibold bg-accent hover:bg-accent-hover text-white transition-all hover:shadow-lg hover:shadow-accent/50"
          >
            Read Detailed Updates
          </a>
        </motion.div>
      </div>
    </section>
  );
}
