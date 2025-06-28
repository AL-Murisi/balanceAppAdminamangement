// app/api/get-user/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // 1. Fetch the user's profile details
    const { data, error: userError } = await supabase
      .from("profiles")
      .select(
        `
        id,
        email,
        full_name,
        username,
        user_role,
        avatar_url,
        phonenumber,
        balances (
          balance_amount,
          account_number
        ),
        sub_vendors!sub_vendors_user_id_fkey (
          business_name,
          location,
          status
        ),top_up_requests!top_up_requests_user_id_fkey1(
        amount,
        status,
        created_at
        )
      `
      )
      .eq("id", id)
      .single(); // only one record expected

    if (userError) {
      console.error("Error fetching user profile:", userError);
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    // 2. Count how many sub_vendors this user (by 'id') has invited
    // We are querying the 'sub_vendors' table where 'invited_by' matches the current user's 'id'.
    const { count: invitedCount, error: countError } = await supabase
      .from("sub_vendors")
      .select("id", { count: "exact", head: true }) // Select 'id' and get an exact count. 'head: true' means don't return data, just count.
      .eq("invited_by", id); // Filter by the current user's ID

    if (countError) {
      console.error("Error fetching invited users count:", countError);
      return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    // 3. Combine the results
    // Add the invitedCount to the userData object
    const combinedData = {
      ...data,
      invited_users_count: invitedCount,
    };

    return NextResponse.json(combinedData, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";

    return new Response(JSON.stringify({ error: message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
