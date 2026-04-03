import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import ProjectsPreview from "./components/ProjectsPreview";
import { Suspense } from "react";
import LogsPreview from "./components/LogsPreview";

export default function Home() {
  return (
    <main className="text-white">
      <Suspense fallback={<p>Loading logs...</p>}>
        <LogsPreview />
      </Suspense>
      <Navbar />
      <Hero />
      <Stats />
      <Suspense fallback={<p className="p-10">Loading projects...</p>}>
        <ProjectsPreview />
      </Suspense>
    </main>
  );
}
