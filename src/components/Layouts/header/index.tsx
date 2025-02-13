"use client";

import { Bell, HelpCircle, Search, User } from "lucide-react";
import { useState } from "react";

function Header() {
  const [date] = useState(
    new Date().toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  );

  return (
    <header className="flex items-center justify-between border-b bg-white px-10 py-5">
      <div className="text-gray-600">{date}</div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
          <HelpCircle className="h-5 w-5" />
          <span>Helpdesk</span>
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-800">
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">0 min ago</span>
          <button className="rounded-md bg-[#00A3E0] p-1 text-white hover:bg-[#0093c9]">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
export default Header;
