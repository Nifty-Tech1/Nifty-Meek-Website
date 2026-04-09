import { getServerSupabase } from "../../lib/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectsGrid from "../components/ProjectsGrid";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects | Nifty Meek",
  description:
    "Portfolio of production systems and projects built in public. View live projects, experiments, and case studies.",
  openGraph: {
    title: "Projects | Nifty Meek",
    description:
      "Portfolio of production systems and projects built in public.",
    url: "https://niftymeek.vercel.app/projects",
    type: "website",
  },
  twitter: {
    title: "Projects | Nifty Meek",
    description:
      "Portfolio of production systems and projects built in public.",
  },
};

export default async function ProjectsPage() {
  const supabase = await getServerSupabase();

  const { data: projects } = await supabase.from("projects").select("*");

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
              Portfolio
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-3xl">
            <span className="gradient-text">Systems</span> Built & Shipped
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            A collection of live systems, experiments, and ongoing projects
            showcasing technical excellence.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <ProjectsGrid projects={projects || []} />

      <Footer />
    </main>
  );
}
