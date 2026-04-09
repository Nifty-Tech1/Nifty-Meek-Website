"use client";
import { motion } from "framer-motion";

const stats = [
  { label: "Active Projects", value: "12+", icon: "🚀", color: "from-accent" },
  {
    label: "Experiments Run",
    value: "30+",
    icon: "🧪",
    color: "from-blue-500",
  },
  {
    label: "Ideas Shipped",
    value: "100+",
    icon: "✨",
    color: "from-purple-500",
  },
  { label: "Users Reached", value: "5k+", icon: "👥", color: "from-cyan-500" },
];

export default function Stats() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative py-20 px-6 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity" />

              <div className="glass p-6 rounded-xl hover:border-accent/50 transition-colors">
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-text-secondary text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
