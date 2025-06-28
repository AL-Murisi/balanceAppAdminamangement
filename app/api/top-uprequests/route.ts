// pages/api/top-up-requests.ts
import { supabase } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

// This is your service role key (NEVER expose this on the client-side!)

export async function GET() {
  try {
    // Optional: Read query params if needed

    const { data, error } = await supabase

      .from("top_up_requests")
      .select("*,profiles!top_up_requests_user_id_fkey1(email)");
    // .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching users:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ topup: data }, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";

    return new Response(JSON.stringify({ error: message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

interface updateTopUp {
  id: string; // The ID of the sub_vendor to update
  status: "Approved" | "Rejected"; // The new status to set
}
export async function POST(req: Request) {
  try {
    // Parse the JSON body from the request
    const { id, status }: updateTopUp = await req.json();

    // Validate the incoming data
    if (!id || !status || !["Approved", "Rejected"].includes(status)) {
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
      .from("top_up_requests")
      .update({ status: status }) // Set the new status
      .eq("id", id) // Find the record by its ID
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
      { message: "User status updated successfully", topup: data[0] },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";

    return new Response(JSON.stringify({ error: message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
