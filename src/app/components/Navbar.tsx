"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full flex justify-between items-center px-8 py-5 bg-black/40 backdrop-blur-xl border-b border-white/10 z-50"
    >
      <h1 className="font-semibold tracking-wide text-lg">Nifty Meek</h1>

      <div className="flex gap-8 text-sm text-gray-300">
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/blog">Insights</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </motion.nav>
  );
}
