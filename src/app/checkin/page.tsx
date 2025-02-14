"use client";

import { Calendar, Search, User } from "lucide-react";
import Link from "next/link";
import { bookingData } from "@/data/data";

export default function SearchReservations() {
  // Function to get the current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Get the current date
  const currentDate = getCurrentDate();

  return (
    <div className="rounded-lg bg-gray-100 p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900">
      {/* Filters */}
      <div className="border-b border-gray-300 pb-4 dark:border-gray-700">
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="relative">
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              defaultValue={currentDate} // Set default value to current date
            />
          </div>
          <div className="relative">
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              defaultValue={currentDate} // Set default value to current date
            />
          </div>
          <div className="relative">
            <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <option>STATUS</option>
              <option>Booked</option>
              <option>Checked In</option>
              <option>Checked Out</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Guest Name"
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Confirmation No."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Room Number"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <button className="flex items-center justify-center gap-2 rounded-lg bg-[#5750F1] px-4 py-2 text-white transition-all hover:bg-[#4940D3]">
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>
      </div>

      {/* Booking List */}
      <div className="mt-6">
        <div className="relative overflow-x-auto">
          {bookingData.map((reservation, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-9 border-b border-gray-300 py-4 last:border-0 sm:grid-cols-7 dark:border-gray-700"
            >
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Conf#</div>
                <div className="text-gray-900 dark:text-white">{reservation.confirmationNumber}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Guest</div>
                <div className="text-gray-900 dark:text-white">{reservation.profileName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Check In/Out</div>
                <div className="text-gray-900 dark:text-white">{reservation.checkInDate}</div>
                <div className="text-gray-900 dark:text-white">{reservation.checkOutDate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Room Selection</div>
                <div className="text-gray-900 dark:text-white">{reservation.roomSelection}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Payment Method</div>
                <div className="text-[#5750F1] dark:text-blue-300">{reservation.paymentMethod}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Company</div>
                <div className="text-[#5750F1] dark:text-blue-300">{reservation.reservationNumber}</div>
              </div>
              {/* Moved the "Booked" button to the last column */}
              <div className="flex justify-end items-center">
                <Link
                  href={{
                    pathname: "/arrival",
                    query: {
                      profileName: reservation.profileName,
                      reservationNumber: reservation.reservationNumber,
                      confirmationNumber: reservation.confirmationNumber,
                      checkInDate: reservation.checkInDate,
                      checkOutDate: reservation.checkOutDate,
                      roomSelection: reservation.roomSelection, // Pass the room selection
                      paymentMethod: reservation.paymentMethod,
                    },
                  }}
                >
                  <span className="cursor-pointer rounded-full bg-[#D9D7FF] px-6 py-3 text-l font-semibold text-[#5750F1] dark:bg-[#5750F1] dark:text-white">
  Check in
</span>

                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}