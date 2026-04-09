import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import ProjectsPreview from "./components/ProjectsPreview";
import { Suspense } from "react";
import LogsPreview from "./components/LogsPreview";
import Cta from "./components/Cta";
import MediaGallery from "./components/MediaGallery";
import ProgressDashboard from "./components/ProgressDashboard";

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
