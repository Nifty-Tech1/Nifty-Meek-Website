import LogsPreview from "../../app/components/LogsPreview";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Insights & Logs | Nifty Meek",
  description:
    "Real-time updates on progress, experiments, failures, and wins. Building in public with weekly logs and insights.",
  openGraph: {
    title: "Insights & Logs | Nifty Meek",
    description:
      "Real-time updates on progress, experiments, failures, and wins. Building in public.",
    url: "https://niftymeek.vercel.app/blog",
    type: "website",
  },
  twitter: {
    title: "Insights & Logs | Nifty Meek",
    description: "Real-time updates on progress and building in public.",
  },
};

export default function BlogPage() {
  return (
    <main className="text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative px-6 md:px-8 py-24 overflow-hidden">
        <div className="blob w-96 h-96 bg-blue-500/20 -top-48 -left-48" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-text-secondary">
              Logs & Updates
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-3xl">
            Building <span className="gradient-text">in Public</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            Real-time updates on progress, experiments, failures, and wins.
            Transparent documentation of the journey.
          </p>
        </div>
      </section>

      {/* Logs Preview */}
      <LogsPreview />

      <Footer />
    </main>
  );
}
