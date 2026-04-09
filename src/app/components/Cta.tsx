"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Cta() {
  return (
    <section className="relative px-6 md:px-8 py-24 overflow-hidden">
      {/* Background Blob */}
      <div className="blob w-96 h-96 bg-accent/20 -bottom-48 -right-48" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-text-secondary">
              Stay Updated
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Follow the <span className="gradient-text">Journey Forward</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Join a community of builders and operators who believe in executing
            in public. Get weekly updates on systems, experiments, and lessons
            learned.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog">
              <button className="px-8 py-4 rounded-xl font-semibold bg-accent hover:bg-accent-hover text-white transition-all hover:shadow-lg hover:shadow-accent/50">
                Read Logs & Updates
              </button>
            </Link>

            <Link href="/contact">
              <button className="px-8 py-4 rounded-xl font-semibold border border-border-color text-text-primary hover:bg-surface-light transition-all">
                Get in Touch
              </button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-12 pt-12 border-t border-border-color flex items-center justify-center gap-4 text-text-secondary text-sm">
            <span>Building in public since 2024</span>
            <span className="w-1 h-1 rounded-full bg-text-tertiary" />
            <span>Systems that scale globally</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
