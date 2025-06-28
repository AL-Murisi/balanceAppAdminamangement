import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET(req: Request) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
    id,
    email,
    full_name,
    username,
    user_role,
    phonenumber,
   avatar_url,
    balances (
      balance_amount,
      account_number
    ),
    sub_vendors!sub_vendors_user_id_fkey (
      business_name,
      location,
  
      status
    )
  `
      )
      .neq("user_role", "admin");

    if (error) {
      console.error("Error fetching users:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ users: data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal error" },
      { status: 500 }
    );
  }
}
