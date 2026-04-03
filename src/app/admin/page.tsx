import { getServerSupabase } from "../../lib/auth";
import { redirect } from "next/navigation";
import AdminProjectItem from "../components/AdminProjectItem";

export default async function AdminPage() {
  const supabase = await getServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: projects } = await supabase.from("projects").select("*");

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">Admin Dashboard</h1>

      <a href="/admin/new" className="px-4 py-2 bg-white text-black rounded">
        + New Project
      </a>

      <div className="mt-8 space-y-4">
        {projects?.map((p) => (
          <AdminProjectItem key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
