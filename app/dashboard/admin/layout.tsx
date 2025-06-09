"use client";
import * as React from "react";
import { Home, Inbox, SquareCheckBig, Users } from "lucide-react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ComplexDropdownMenu from "@/components/complex-dropdown-menu";

const items = [
  {
    title: "Home",
    url: "/dashboard/admin",
    icon: Home,
  },
  {
    title: "Pointage",
    url: "/dashboard/admin/pointage",
    icon: SquareCheckBig,
  },
  {
    title: "Employés",
    url: "/dashboard/admin/employees",
    icon: Users,
  },
  {
    title: "Demandes d'absence",
    url: "/dashboard/admin/requests",
    icon: Inbox,
  },

  // {
  //   title: "Les administrateurs",
  //   url: "/dashboard/admin/admins",
  //   icon: Users,
  // },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <NavigationMenu>
        <NavigationMenuList className="w-[100vw] flex items-center justify-between px-5 py-3 border-b-2 border-b-gray-200 fixed top-0 bg-white z-50">
          <div className="flex items-center">
            {items.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link href={item.url} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.icon && <item.icon className="mr-2 h-4 w-4 inline" />}
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </div>
          <ComplexDropdownMenu />
        </NavigationMenuList>
      </NavigationMenu>

      <main className="flex-1 container mx-auto pt-24 pb-12 px-4">
        {children}
      </main>
    </div>
  );
}
