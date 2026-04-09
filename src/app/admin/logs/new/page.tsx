import { getServerSupabase } from "../../../../lib/auth";
import { redirect } from "next/navigation";
import NewLog from "./NewLog";

export default async function Page() {
  const supabase = await getServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <NewLog />;
}
