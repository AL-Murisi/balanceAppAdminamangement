// app/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { NavigationMenuDemo } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import "@/app/globals.css"; // Make sure your global styles are imported
// import Session from "@/lib/session";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = Session();
  // if (!session) {
  //   redirect("/auth");
  // }
  return (
    <main>
      <NavigationMenuDemo />
      {children}
    </main>
  );
}
