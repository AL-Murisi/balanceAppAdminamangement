"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ModeToggle } from "./toggole";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup>
      <ModeToggle />
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              className="group-data-[collapsible=icon]:pr-2 group-data-[collapsible=icon]:justify-center"
              tooltip={item.title}
              asChild
            >
              <Link href={item.url} className="flex items-center gap-2 ">
                {item.icon && (
                  <item.icon className="w-4 h-4 group-data-[collapsible=icon]:h-4 group-data-[collapsible=icon]:w-4 " />
                )}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
