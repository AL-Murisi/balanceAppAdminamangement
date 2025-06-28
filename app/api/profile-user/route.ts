// app/api/get-users/route.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: async () => (await cookies()).getAll(),
        setAll: () => {}, // No need to set cookies in GET
      },
    }
  );

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch data for only the authenticated user's ID
  const { data, error } = await supabase
    .from("balances")
    .select("balance_amount")
    .eq("user_id", user.id) // ✅ Filter by logged-in user
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ balance: data.balance_amount }, { status: 200 });
}
