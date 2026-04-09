"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  title: string;
  description: string;
  category: string;
}

const mediaGallery: MediaItem[] = [
  {
    id: "1",
    type: "image",
    url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    title: "Development Sprint",
    description: "Active development session",
    category: "Development",
  },
  {
    id: "2",
    type: "image",
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    title: "Team Collaboration",
    description: "Working with the team",
    category: "Team",
  },
  {
    id: "3",
    type: "image",
    url: "https://images.unsplash.com/photo-1522869635100-ce306e08bc3c?w=800&h=600&fit=crop",
    title: "System Architecture",
    description: "Designing scalable systems",
    category: "Architecture",
  },
  {
    id: "4",
    type: "image",
    url: "https://images.unsplash.com/photo-1516534775068-bb57e5f17daf?w=800&h=600&fit=crop",
    title: "Product Launch",
    description: "Shipping and deploying",
    category: "Launch",
  },
  {
    id: "5",
    type: "image",
    url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    title: "Code Review",
    description: "Quality assurance",
    category: "Development",
  },
  {
    id: "6",
    type: "image",
    url: "https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=800&h=600&fit=crop",
    title: "Server Infrastructure",
    description: "Cloud deployment",
    category: "Architecture",
  },
];

export default function MediaGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const categories = [
    "All",
    ...new Set(mediaGallery.map((item) => item.category)),
  ];

  const filteredMedia =
    selectedCategory === "All"
      ? mediaGallery
      : mediaGallery.filter((item) => item.category === selectedCategory);

  return (
    <section className="relative px-6 md:px-8 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-medium text-text-secondary">
              Gallery
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Progress in Motion
          </h2>
          <p className="text-text-secondary max-w-2xl">
            Visual documentation of systems being built, shipped, and scaled.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-accent text-white"
                  : "border border-border-color text-text-secondary hover:border-accent/50"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMedia.map((media, idx) => (
              <motion.div
                key={media.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedMedia(media)}
                className="group relative cursor-pointer"
              >
                <div className="glass rounded-xl overflow-hidden h-64 md:h-72 hover:border-accent/50 transition-all">
                  {/* Placeholder Image */}
                  <div className="relative w-full h-full bg-surface-light flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative w-full h-full flex items-center justify-center">
                      {media.type === "image" ? (
                        <div className="text-4xl">📸</div>
                      ) : (
                        <div className="text-4xl">🎥</div>
                      )}
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
                    <h3 className="text-white font-semibold">{media.title}</h3>
                    <p className="text-white/70 text-sm">{media.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMedia(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl w-full"
              >
                <div className="glass rounded-2xl p-6">
                  <div className="aspect-video bg-surface-light rounded-lg mb-6 flex items-center justify-center">
                    {selectedMedia.type === "image" ? (
                      <div className="text-6xl">📸</div>
                    ) : (
                      <div className="text-6xl">🎥</div>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedMedia.title}
                  </h2>
                  <p className="text-text-secondary mb-4">
                    {selectedMedia.description}
                  </p>
                  <div className="inline-block px-3 py-1 rounded-lg bg-accent/10 border border-accent/50 text-accent text-sm font-medium">
                    {selectedMedia.category}
                  </div>

                  <button
                    onClick={() => setSelectedMedia(null)}
                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-all"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
