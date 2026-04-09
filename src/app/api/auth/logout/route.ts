import { getServerSupabase } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await getServerSupabase();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json({ error: "Failed to logout" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
