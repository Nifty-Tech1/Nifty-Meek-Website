import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import ProjectsPreview from "./components/ProjectsPreview";
import { Suspense } from "react";
import LogsPreview from "./components/LogsPreview";
import Cta from "./components/Cta";
import MediaGallery from "./components/MediaGallery";
import ProgressDashboard from "./components/ProgressDashboard";

export const metadata = {
  title: "Nifty Meek | Building Real Systems in Public",
  description:
    "Explore projects, progress tracking, and real-time updates from building production systems. Join the journey of execution over ideas.",
  openGraph: {
    title: "Nifty Meek | Building Real Systems in Public",
    description:
      "Explore projects, progress tracking, and real-time updates from building production systems.",
    url: "https://niftymeek.vercel.app",
    type: "website",
  },
  twitter: {
    title: "Nifty Meek | Building Real Systems in Public",
    description:
      "Explore projects, progress tracking, and real-time updates from building production systems.",
  },
};

export default function Home() {
  return (
    <main className="text-white">
      <Navbar />
      <Hero />
      <Stats />
      <ProgressDashboard />
      <Suspense fallback={<p className="p-10">Loading logs...</p>}>
        <LogsPreview />
      </Suspense>
      <Suspense fallback={<p className="p-10">Loading projects...</p>}>
        <ProjectsPreview />
      </Suspense>
      <MediaGallery />
      <Cta />
    </main>
  );
}
