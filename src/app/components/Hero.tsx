"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-28 pb-10 overflow-hidden">
      {/* Animated Blobs */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="blob w-96 h-96 bg-accent/20 -top-40 -left-40"
      />
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="blob w-96 h-96 bg-blue-500/20 -bottom-40 -right-40"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-color glass">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-text-secondary">
              Building in Public • Zambia → Global
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 variants={itemVariants} className="text-center">
          <span className="gradient-text block mb-4">Systems That Scale.</span>
          <span className="text-text-secondary">
            Not Just Ideas. Real Execution.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-center text-text-secondary max-w-2xl mx-auto text-lg"
        >
          Founder. Builder. Operator. Documenting the journey from concept to
          production—live, transparent, and relentlessly ambitious.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex gap-4 justify-center flex-wrap"
        >
          <Link href="/blog">
            <button className="group relative px-8 py-3 rounded-xl font-semibold overflow-hidden bg-accent hover:bg-accent-hover text-white transition-all hover:shadow-lg hover:shadow-accent/50">
              <span className="relative z-10">Explore Updates</span>
            </button>
          </Link>

          <Link href="/projects">
            <button className="px-8 py-3 rounded-xl font-semibold border border-border-color text-text-primary hover:bg-surface-light transition-all">
              View Work
            </button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-20 flex justify-center"
        >
          <svg
            className="w-6 h-6 text-text-tertiary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
