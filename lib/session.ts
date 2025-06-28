"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Tables } from "@/types/databasetyps";
type Profile = Tables<"profiles">;
export default function Session() {
  const router = useRouter();
  const [userid, setuserid] = useState<Profile>();
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/auth"); // Redirect if not logged in
      }
      if (data.session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .single();
        setuserid(profile);
      }
    };

    checkAuth();
  }, []);
  return { userid };
}
