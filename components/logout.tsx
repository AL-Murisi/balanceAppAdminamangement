import React from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function logout() {
  // const supabase = createClient();
  const router = useRouter();
  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace("/auth"); // Change if your login page is different
  };
}
