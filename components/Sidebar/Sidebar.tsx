"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Stages & Checklist", href: "/" },
  { name: "Upload Docs", href: "/" },
  { name: "Preferred Vendors", href: "/" },
  { name: "Tech Stack", href: "/" },
  { name: "Targets", href: "/" },
  { name: "Zee Sales Targets", href: "/" },
  { name: "MAI Settings", href: "/" },
  { name: "Pending Questions", href: "/", badge: 3 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile: only a floating hamburger, no blue bar */}
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger
            aria-label="Open menu"
            className="fixed left-3 top-3 z-50 inline-flex items-center justify-center rounded-md bg-sky-900/90 p-2 text-white shadow-md backdrop-blur hover:bg-sky-900"
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>

          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="border-b p-4">
              <SheetTitle className="flex items-center justify-center">
                <Image src="/logo.png" alt="Logo" width={120} height={40} priority />
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-2 p-4">
              {menuItems.map((item) => (
                <SheetClose asChild key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-2 text-sm transition",
                      pathname === item.href
                        ? "bg-sky-700 text-white font-medium"
                        : "text-gray-800 hover:bg-gray-100"
                    )}
                  >
                    <span>{item.name}</span>
                    {item.badge ? (
                      <span className="ml-2 rounded-full bg-sky-600 px-2 py-0.5 text-xs font-bold text-white">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <button className="mt-2 w-full rounded-md px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-100">
                  Logout
                </button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: normal sidebar (md and up) */}
      <aside className="sticky top-0 hidden h-full min-h-screen w-60 shrink-0 bg-gradient-to-b from-sky-900 to-sky-800 text-gray-200 md:flex md:flex-col md:justify-between md:p-4">
        <div>
          <div className="mb-8 flex justify-center">
            <Image src="/logo.png" alt="Logo" width={120} height={40} priority />
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2 text-sm transition",
                  pathname === item.href
                    ? "bg-sky-700 text-white font-medium"
                    : "hover:bg-sky-700 hover:text-white"
                )}
              >
                <span>{item.name}</span>
                {item.badge ? (
                  <span className="ml-2 rounded-full bg-sky-600 px-2 py-0.5 text-xs font-bold">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>
        </div>

        <div className="cursor-pointer px-3 py-2 text-sm text-gray-400 hover:text-white">
          Logout
        </div>
      </aside>
    </>
  );
}
