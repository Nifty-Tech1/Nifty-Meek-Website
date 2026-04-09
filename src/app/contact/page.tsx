"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import Link from "next/link";

const contactMethods = [
  {
    icon: "✉️",
    title: "Email",
    description: "Direct communication",
    link: "mailto:bufukemukangasa@gmail.com",
    display: "bufukemukangasa@gmail.com",
  },
  {
    icon: "💬",
    title: "Twitter",
    description: "Public conversation",
    link: "https://twitter.com",
    display: "@yourhandle",
  },
  {
    icon: "🔗",
    title: "LinkedIn",
    description: "Professional network",
    link: "https://linkedin.com",
    display: "LinkedIn Profile",
  },
];

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail("");
        setMessage("");
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <main className="text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative px-6 md:px-8 py-24 overflow-hidden">
        <div className="blob w-96 h-96 bg-blue-500/20 -top-48 -left-48" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-medium text-text-secondary">
              Let's Connect
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-3xl">
            Let's Build <span className="gradient-text">Something Real</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            If you're serious about building systems, scaling ideas, or working
            together — reach out.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="relative px-6 md:px-8 py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, idx) => (
              <motion.a
                key={idx}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group glass rounded-xl p-6 border border-border-color hover:border-accent/50 transition-all"
              >
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-lg font-semibold group-hover:gradient-text transition-all mb-2">
                  {method.title}
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  {method.description}
                </p>
                <span className="inline-flex items-center gap-2 text-accent font-medium text-sm">
                  {method.display} <span>→</span>
                </span>
              </motion.a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass rounded-xl p-8 md:p-12 border border-border-color"
            >
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-200"
                >
                  ✓ Message sent! I'll get back to you soon.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-light rounded-lg border border-border-color text-white placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 bg-surface-light rounded-lg border border-border-color text-white placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-semibold transition-all"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
