// app/layout.tsx
import { NavigationMenuDemo } from "@/components/app-sidebar";
import "@/app/globals.css"; // Make sure your global styles are imported
// import Session from "@/lib/session";

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
