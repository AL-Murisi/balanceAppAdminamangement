// /app/api/get-users/route.ts
//import { createClient } from '@supabase/supabase-js';
import { supabase } from "@/lib/supabase/client";
// import { createServerClient } from '@supabase/auth-helpers-nextjs';
// npm install @supabase/auth-helpers-nextjs
import { NextResponse } from "next/server";
type NewUsers = {
  id: string;
  status: "Rejected" | "pending" | "Approved";
  email: string;
  business_name: string;
  phone_number: string;
  location: string;
};
export async function GET(req: Request) {
  try {
    const { data, error } = await supabase
      .from("sub_vendors")
      .select("*,profiles!sub_vendors_user_id_fkey(email)")
      .neq("status", "approved")
      .eq("invite_code", "")
      .order("created_at", { ascending: false });
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
interface UpdateUserStatusRequestBody {
  id: string; // The ID of the sub_vendor to update
  status: "rejected" | "pending" | "approved"; // The new status to set
}
export async function POST(req: Request) {
  try {
    // Parse the JSON body from the request
    const { id, status }: UpdateUserStatusRequestBody = await req.json();

    // Validate the incoming data
    if (
      !id ||
      !status ||
      !["approved", "rejected", "pending"].includes(status)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid request body. 'id' and 'status' (Approved/Rejected) are required.",
        },
        { status: 400 }
      );
    }

    // Perform the update operation in Supabase
    const { data, error } = await supabase
      .from("sub_vendors")
      .update({ status: status }) // Set the new status
      .eq("user_id", id) // Find the record by its ID
      .select(); // Select the updated row to return it

    if (error) {
      console.error("Error updating user status:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Check if any row was actually updated
    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "User not found or status already set." },
        { status: 404 }
      );
    }

    // Return a success response with the updated user data
    return NextResponse.json(
      { message: "User status updated successfully", user: data[0] },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Internal server error during user status update:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
