import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const nonAuthPath = ["/auth", "/register", "/email-verify"];
const protectedRoutes = ["/admin"];

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("user_role")
      .eq("id", user.id)
      .single();
    if (profile?.user_role !== "admin") {
      return NextResponse.redirect(
        new URL("/auth?error=not_authorized", request.url)
      );
    }
  }

  if (!user && nonAuthPath.some((e) => request.nextUrl.pathname.startsWith(e)))
    return response;

  if (user && nonAuthPath.some((e) => request.nextUrl.pathname.startsWith(e)))
    return NextResponse.redirect(new URL("/", request.url));

  if (
    !user &&
    protectedRoutes.some((e) => request.nextUrl.pathname.startsWith(e))
  ) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return response;
}
