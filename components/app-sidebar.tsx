// "use client";

// import * as React from "react";
// import Link from "next/link";
// import {
//   ArrowUpCircleIcon,
//   CameraIcon,
//   ClipboardListIcon,
//   DatabaseIcon,
//   FileCodeIcon,
//   FileIcon,
//   FileTextIcon,
//   HelpCircleIcon,
//   SearchIcon,
//   SettingsIcon,
//   Home,
//   Inbox,
//   Calendar,
//   Search,
//   Settings,
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarTrigger,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { NavMain } from "./nav-main";
// import { NavUser } from "./nav-user";
// import { NavDocuments } from "./nav-documents";

// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   navMain: [
//     { title: "Home", url: "/admin", icon: Home },
//     { title: "Inbox", url: "/admin/manageusers", icon: Inbox },
//     { title: "newUser", url: "/admin/newUser", icon: Calendar },
//     { title: "topuprequest", url: "/admin/topuprequests", icon: Calendar },
//     { title: "Search", url: "#", icon: Search },
//     { title: "Settings", url: "#", icon: Settings },
//   ],
//   navSecondary: [
//     { title: "Settings", url: "#", icon: SettingsIcon },
//     { title: "Get Help", url: "#", icon: HelpCircleIcon },
//     { title: "Search", url: "#", icon: SearchIcon },
//   ],
//   documents: [
//     { name: "Data Library", url: "#", icon: DatabaseIcon },
//     { name: "Reports", url: "#", icon: ClipboardListIcon },
//     { name: "Word Assistant", url: "#", icon: FileIcon },
//   ],
// };
// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const [collapsed, setCollapsed] = React.useState(false);
//   //  const { collapsed } = useSidebar();
//   return (
//     <Sidebar collapsible="icon" side="right" {...props}>
//       <SidebarHeader>
//         <NavMain items={data.navMain} />
//       </SidebarHeader>
//       <SidebarContent>
//         <NavDocuments items={data.documents} />
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser user={data.user} />
//       </SidebarFooter>
//     </Sidebar>
//   );
// }
"use client";

import * as React from "react";
import Link from "next/link";
import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  MenuIcon,
  MoreVerticalIcon,
  UserCircleIcon,
  XIcon,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./toggole";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import Session from "@/lib/session";
import { supabase } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

// Arabic nav links
const navLinks = [
  { title: "إدارة المستخدمين", href: "/admin/manageusers" },
  { title: "مستخدم جديد", href: "/admin/newUser" },
  { title: "طلبات التعبئة", href: "/admin/topuprequests" },
  { title: "الرئيسية", href: "/admin" },
  // { title: "الوثائق", href: "/docs" },
];

export function NavigationMenuDemo() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { userid } = Session();
  const signOut = async () => {
    await supabase.auth.signOut();
    redirect("/");
  };

  return (
    <div className="w-full rtl border-b-2  ">
      <div className="flex items-center justify-between md:hidden p-4 shadow">
        <span className="font-bold text-lg">القائمة</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className=" focus:outline-none"
        >
          {isOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden  shadow px-4 py-2 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="block text-right  hover:text-blue-600 font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.title}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                  <AvatarImage src={userid?.avatar_url ?? ""} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] bg-amber-900 min-w-56 rounded-lg"
              // side={ ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={userid?.avatar_url ?? ""} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {userid?.username}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {userid?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserCircleIcon />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCardIcon />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BellIcon />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={
                  signOut
                  // Optional: redirect after logout
                }
              >
                <LogOutIcon className="mr-2" />
                Log out
              </DropdownMenuItem>
              <ModeToggle />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Desktop Menu with NavigationMenu */}
      <div className="hidden md:block shadow flex-row justify-between ">
        <NavigationMenu>
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={"/icon.png"} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <NavigationMenuList className="flex justify-end px-8 py-4 space-x-6 space-x-reverse">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.title}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={link.href}>{link.title}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                  <AvatarImage src={userid?.avatar_url ?? ""} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] bg-amber-900 min-w-56 rounded-lg"
              // side={ ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={userid?.avatar_url ?? ""} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {userid?.username}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {userid?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserCircleIcon />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCardIcon />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BellIcon />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={
                  signOut
                  // Optional: redirect after logout
                }
              >
                <LogOutIcon className="mr-2" />
                Log out
              </DropdownMenuItem>
              <ModeToggle />
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenu>
      </div>
    </div>
  );
}
