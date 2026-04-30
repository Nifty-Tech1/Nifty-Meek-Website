"use client";

import { useEffect, useState } from "react";
import { getAchievementsAction } from "@/lib/actions";
import { motion } from "framer-motion";

interface Achievement {
  id: string;
  title: string;
  description: string;
  status: "planned" | "in-progress" | "completed";
  progress_percent: number;
  category: string;
  target_date: string | null;
  completed_at: string | null;
}

interface Stats {
  total: number;
  completed: number;
  inProgress: number;
  planned: number;
  overallProgress: number;
}

export default function ProgressDashboard() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      const result = await getAchievementsAction();

      if (result.success) {
        setAchievements(result.achievements);
        setStats(result.stats);
      } else {
        setError(result.error || "Failed to load achievements");
      }
      setLoading(false);
    };

    fetchAchievements();
  }, []);

  // Get unique categories
  const categories = ["All", ...new Set(achievements.map((a) => a.category))];

  // Filter achievements
  const filtered =
    selectedCategory === "All"
      ? achievements
      : achievements.filter((a) => a.category === selectedCategory);

  // Status config
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
      color: "bg-gray-500",
      textColor: "text-gray-400",
      label: "Planned",
    },
  };

  if (loading) {
    return (
      <section className="relative px-6 md:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-text-secondary text-center">
            Loading achievements...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative px-6 md:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-400 text-center">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative px-6 md:px-8 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-text-secondary">
              Progress
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Milestones & Goals
          </h2>
          <p className="text-text-secondary max-w-2xl">
            Real progress tracking. What we&apos;ve built, what we&apos;re
            building, what&apos;s next.
          </p>
        </div>

        {/* Stats Overview (if available) */}
        {stats && (
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass rounded-lg p-4 border border-border-color text-center"
            >
              <p className="text-3xl font-bold gradient-text">{stats.total}</p>
              <p className="text-text-secondary text-sm">Total Goals</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-lg p-4 border border-border-color text-center"
            >
              <p className="text-3xl font-bold text-green-400">
                {stats.completed}
              </p>
              <p className="text-text-secondary text-sm">Completed</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-lg p-4 border border-border-color text-center"
            >
              <p className="text-3xl font-bold text-accent">
                {stats.inProgress}
              </p>
              <p className="text-text-secondary text-sm">In Progress</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-lg p-4 border border-border-color text-center"
            >
              <p className="text-3xl font-bold text-gray-400">
                {stats.planned}
              </p>
              <p className="text-text-secondary text-sm">Planned</p>
            </motion.div>
          </div>
        )}

        {/* Overall Progress Bar */}
        {stats && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-12 glass rounded-lg p-6 border border-border-color"
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-text-primary font-semibold">
                Overall Progress
              </p>
              <p className="text-accent font-bold">{stats.overallProgress}%</p>
            </div>
            <div className="h-3 bg-surface rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${stats.overallProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-accent text-white"
                  : "glass border border-border-color text-text-secondary hover:border-accent/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Achievements List */}
        <motion.div className="space-y-6">
          {filtered.map((achievement, idx) => {
            const config = statusConfig[achievement.status];
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-lg p-6 border border-border-color hover:border-accent/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${config.textColor} bg-${config.color}/10 border border-${config.color}/30`}
                      >
                        {config.label}
                      </span>
                      <span className="text-xs text-text-tertiary">
                        {achievement.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1">
                      {achievement.title}
                    </h3>
                    {achievement.description && (
                      <p className="text-text-secondary text-sm">
                        {achievement.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-text-secondary">Progress</p>
                    <p className="text-accent font-medium">
                      {achievement.progress_percent}%
                    </p>
                  </div>
                  <div className="h-2 bg-surface rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${config.color}`}
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${achievement.progress_percent}%`,
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Date Info */}
                {achievement.target_date && (
                  <p className="text-xs text-text-tertiary mt-3">
                    Target:{" "}
                    {new Date(achievement.target_date).toLocaleDateString()}
                  </p>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-text-secondary">
            No achievements in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
