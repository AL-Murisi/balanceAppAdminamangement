"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        router.push("/admin");
      } else {
        router.push("/auth");
      }
    };

    checkSession();
  }, [router]);

  return null; // Optional loading spinner here
}
