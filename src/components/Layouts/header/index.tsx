"use client";

import { Home, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";

export function Header() {
  const { isMobile } = useSidebarContext();

  // Get current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="sticky right-0 top-0 z-30 ml-auto flex items-center justify-between border-b border-stroke bg-white px-4 py-5 shadow-1 dark:border-stroke-dark dark:bg-gray-dark md:px-5 2xl:px-10">
      {isMobile && (
        <Link href={"/"} className="ml-2 max-[430px]:hidden min-[375px]:ml-4">
          <Image
            src={"/images/logo/logo-icon.svg"}
            width={32}
            height={32}
            alt=""
            role="presentation"
          />
        </Link>
      )}

      <div className="max-xl:hidden">
        {/* Top Navigation */}
        <header className="border-b">
          <div className="container mx-auto flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <button className="p-2">
                <Clock className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">{currentDate}</span>
              <button className="rounded-md px-4 py-2 text-gray-600 hover:bg-gray-100">
                Helpdesk
              </button>
              <button className="rounded-md p-2 hover:bg-gray-100">
                <Users className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4"></div>
    </header>
  );
}
