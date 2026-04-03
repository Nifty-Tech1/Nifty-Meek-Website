"use client";
import { motion } from "framer-motion";

const stats = [
  { label: "Projects Built", value: "12+" },
  { label: "Experiments Run", value: "30+" },
  { label: "Ideas Tested", value: "100+" },
];

export default function Stats() {
  return (
    <section className="grid md:grid-cols-3 gap-6 px-10 py-20">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur"
        >
          <h2 className="text-3xl font-bold">{s.value}</h2>
          <p className="text-gray-400 mt-2">{s.label}</p>
        </motion.div>
      ))}
    </section>
  );
}
