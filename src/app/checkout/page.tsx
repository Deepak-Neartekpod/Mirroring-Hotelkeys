"use client";

import { useState, useEffect } from "react";
import { Search, Hash, User, BedDouble, CheckCircle } from "lucide-react";
import Link from "next/link";
import { bookingData } from "@/data/data";

export default function SearchCheckouts() {
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState(bookingData);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    const input = searchInput.trim();
    setFilteredData(
      input.length >= 1
        ? bookingData.filter((reservation) =>
            reservation.confirmationNumber.startsWith(input)
          )
        : bookingData
    );
  }, [searchInput]);

  return (
    <div className="rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-300 dark:bg-gray-900 dark:ring-gray-700">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Check-out Reservation
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">{currentDate}</p>
      </div>

      <div className="border-b border-gray-300 pb-4 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Enter confirmation number..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5750F1]"
          />
          <button className="flex items-center justify-center gap-2 rounded-lg bg-[#5750F1] px-5 py-2 text-white transition-all hover:bg-[#4940D3]">
            <Search className="h-5 w-5" />
            Search
          </button>
        </div>
      </div>

      <div className="mt-6">
        <div className="relative overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <tr className="text-center">
                <th className="px-5 py-3 font-semibold uppercase tracking-wide">
                  <div className="flex items-center justify-center gap-2">
                    <Hash className="h-4 w-4" />
                    Confirmation Number
                  </div>
                </th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wide">
                  <div className="flex items-center justify-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </div>
                </th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wide">
                  <div className="flex items-center justify-center gap-2">
                    <BedDouble className="h-4 w-4" />
                    Room Type
                  </div>
                </th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wide">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Activation
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((reservation, index) => (
                  <tr key={index} className="text-center text-gray-900 dark:text-white">
                    <td className="px-5 py-4">{reservation.confirmationNumber}</td>
                    <td className="px-5 py-4">{reservation.profileName}</td>
                    <td className="px-5 py-4">{reservation.roomType}</td>
                    <td className="px-5 py-4">
                      <Link
                        href={{
                          pathname: "/departure",
                          query: {
                            confirmationNumber: reservation.confirmationNumber,
                            profileName: reservation.profileName,
                            roomType: reservation.roomType,
                          },
                        }}
                      >
                        <span className="cursor-pointer rounded-md bg-[#D9D7FF] px-4 py-2 text-sm font-semibold text-[#5750F1] dark:bg-[#5750F1] dark:text-white transition-all hover:bg-[#4940D3] hover:text-white">
                          Check out
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-5 py-4 text-center text-gray-600 dark:text-gray-400">
                    No matching reservation found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}