"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-150 h-150 bg-purple-500/20 blur-[120px] rounded-full -top-25" />

      <motion.h1
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold leading-tight"
      >
        Documenting Real Business Execution in Africa
        <br />
        <span className="text-white/70">From Zambia</span>
        <br />
      </motion.h1>

      <motion.p
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-gray-400 max-w-xl"
      >
        Founder. Builder. Operator. Documenting execution, not theory.
      </motion.p>

      <br />

      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-10 flex gap-4"
      >
        <button className="px-8 py-4 bg-white text-black rounded-2xl hover:scale-105 hover:shadow-xl transition cursor-pointer">
          Follow Journey
        </button>

        <button className="px-8 py-4 bg-white/20 text-white rounded-2xl hover:scale-105 hover:shadow-xl transition cursor-pointer">
          View Projects
        </button>
      </motion.div>
    </section>
  );
}
