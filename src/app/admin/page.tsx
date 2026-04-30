import { getServerSupabase } from "../../lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "../components/LogoutButton";
import AdminMediaPanel from "@/app/components/AdminMediaPanel";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-20">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 md:mb-16 pb-6 md:pb-8 border-b border-border-color">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-medium text-text-secondary">
                Dashboard
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              Control Center
            </h1>

            <p className="text-text-secondary text-sm sm:text-base">
              Welcome back,{" "}
              <span className="text-accent font-semibold">{user.email}</span>
            </p>
          </div>

          <LogoutButton />
        </div>

        {/* STATS */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
          <div className="glass rounded-xl p-5 sm:p-6 border border-border-color">
            <div className="text-2xl sm:text-3xl mb-3">📊</div>
            <p className="text-text-secondary text-sm mb-2">Total Projects</p>
            <p className="text-2xl sm:text-3xl font-bold gradient-text">∞</p>
          </div>

          <div className="glass rounded-xl p-5 sm:p-6 border border-border-color">
            <div className="text-2xl sm:text-3xl mb-3">📝</div>
            <p className="text-text-secondary text-sm mb-2">Total Logs</p>
            <p className="text-2xl sm:text-3xl font-bold gradient-text">∞</p>
          </div>

          <div className="glass rounded-xl p-5 sm:p-6 border border-border-color sm:col-span-2 md:col-span-1">
            <div className="text-2xl sm:text-3xl mb-3">⭐</div>
            <p className="text-text-secondary text-sm mb-2">Active Status</p>
            <p className="text-base sm:text-lg font-semibold text-green-400">
              Building
            </p>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Quick Actions</h2>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            <Link
              href="/admin/logs/new"
              className="group relative p-6 md:p-8 glass rounded-xl border border-border-color hover:border-accent/50 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg glass mb-4 flex items-center justify-center text-xl md:text-2xl">
                  📝
                </div>

                <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:gradient-text transition-all">
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
              className="group relative p-6 md:p-8 glass rounded-xl border border-border-color hover:border-accent/50 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg glass mb-4 flex items-center justify-center text-xl md:text-2xl">
                  🚀
                </div>

                <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:gradient-text transition-all">
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

        {/* IMAGE UPLOAD PANEL (NEW SYSTEM ADDITION) */}
        <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-border-color">
          <h2 className="text-xl font-bold mb-4">Media Upload</h2>

          <div className="glass rounded-xl p-5 md:p-6 border border-border-color">
            <p className="text-text-secondary text-sm mb-4">
              Upload assets to your system (projects, logs, gallery)
            </p>

            <AdminMediaPanel />
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-border-color">
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
