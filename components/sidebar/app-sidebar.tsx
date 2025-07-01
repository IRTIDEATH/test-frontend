import * as React from "react";
import { Computer, LucideIcon, ScrollText, Tag } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

interface Inavmain {
  title: string;
  url: string;
  icon: LucideIcon;
}

const data: { navMain: Inavmain[] } = {
  navMain: [
    {
      title: "Articles",
      icon: ScrollText,
      url: "/dashboard/articles",
    },
    {
      title: "Category",
      icon: Tag,
      url: "/dashboard/category",
    },
  ],
};

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center">
                  <Computer className="size-6" />
                </div>
                <span className="font-semibold text-[16px] text-sidebar-primary-foreground">
                  Logoipsum
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className="hover:text-sidebar-primary-foreground"
                >
                  <Link
                    href={item.url}
                    className="font-medium text-primary-foreground"
                  >
                    <item.icon />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
