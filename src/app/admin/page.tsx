import { getServerSupabase } from "../../lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "../components/LogoutButton";

export default async function AdminPage() {
  const supabase = await getServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-20">
        {/* Header with user info */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16 pb-8 border-b border-border-color">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-medium text-text-secondary">
                Dashboard
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Control Center
            </h1>
            <p className="text-text-secondary">
              Welcome back,{" "}
              <span className="text-accent font-semibold">{user.email}</span>
            </p>
          </div>
          <LogoutButton />
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass rounded-xl p-6 border border-border-color">
            <div className="text-3xl mb-3">📊</div>
            <p className="text-text-secondary text-sm mb-2">Total Projects</p>
            <p className="text-3xl font-bold gradient-text">∞</p>
          </div>
          <div className="glass rounded-xl p-6 border border-border-color">
            <div className="text-3xl mb-3">📝</div>
            <p className="text-text-secondary text-sm mb-2">Total Logs</p>
            <p className="text-3xl font-bold gradient-text">∞</p>
          </div>
          <div className="glass rounded-xl p-6 border border-border-color">
            <div className="text-3xl mb-3">⭐</div>
            <p className="text-text-secondary text-sm mb-2">Active Status</p>
            <p className="text-lg font-semibold text-green-400">Building</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            <Link
              href="/admin/logs/new"
              className="group relative p-8 glass rounded-xl border border-border-color hover:border-accent/50 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-lg glass mb-4 flex items-center justify-center text-2xl">
                  📝
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:gradient-text transition-all">
                  Create New Log
                </h3>
                <p className="text-text-secondary text-sm">
                  Document your progress, experiments, and learnings
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-accent font-medium text-sm">
                  Start Writing <span>→</span>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/new"
              className="group relative p-8 glass rounded-xl border border-border-color hover:border-accent/50 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-lg glass mb-4 flex items-center justify-center text-2xl">
                  🚀
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:gradient-text transition-all">
                  Add New Project
                </h3>
                <p className="text-text-secondary text-sm">
                  Showcase your latest builds and deployments
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-accent font-medium text-sm">
                  Add Project <span>→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Navigation Help */}
        <div className="mt-12 pt-8 border-t border-border-color">
          <p className="text-text-secondary text-sm">
            Need help?{" "}
            <Link href="/" className="text-accent hover:underline">
              Return to home
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
