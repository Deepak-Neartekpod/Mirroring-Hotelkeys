"use client";

import { Home, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";

export function Header() {
  const { isMobile } = useSidebarContext();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-stroke bg-white px-4 py-5 shadow-1 dark:border-stroke-dark dark:bg-gray-dark md:px-5 2xl:px-10">
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
              <span className="text-gray-600">Sat, Aug 14, 2021</span>
              <button className="rounded-md px-4 py-2 text-gray-600 hover:bg-gray-100">
                Helpdesk
              </button>
              <span className="text-gray-600">2.0 min ago</span>
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
