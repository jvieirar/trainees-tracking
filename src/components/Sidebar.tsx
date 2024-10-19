"use client";

import { useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Home, Users, Calendar, BarChart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/trainees", icon: Users, label: "Trainees" },
    { href: "/attendance", icon: Calendar, label: "Attendance" },
    { href: "/analytics", icon: BarChart, label: "Analytics" },
  ];

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold">Trainee Tracker</h1>
        <UserButton afterSignOutUrl="/" />
      </div>
      <nav className="space-y-2 flex-grow">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded"
            onClick={() => setOpen(false)}
          >
            <link.icon size={20} />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );

  return (
    <>
      <aside className="hidden md:flex md:flex-col md:w-64 bg-gray-100 p-4 h-screen">
        <SidebarContent />
      </aside>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-gray-100 p-4">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}