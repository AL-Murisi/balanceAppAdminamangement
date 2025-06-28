import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
export async function topUpUserBalance(
  adminId: string,
  userId: string,
  amount: number
) {
  const { data, error } = await supabase.rpc("top_up_user_balance", {
    p_admin_id: adminId,
    p_recipient_user_id: userId,
    p_topup_amount: amount,
  });

  if (error) {
    console.error("Top-up failed:", error.message);
    alert("Top-up failed: " + error.message);
  } else {
    alert("Balance top-up successful!");
  }
}
