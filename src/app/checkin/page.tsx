"use client";

import { Calendar, Search, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { bookingData } from "@/data/data";

export default function SearchReservations() {
  return (
    <div className="rounded-lg bg-white shadow">
      <div className="border-b p-4">
        <div className="mb-4 grid grid-cols-4 gap-4">
          <div className="relative">
            <input
              type="date"
              className="w-full rounded border px-3 py-2"
              defaultValue="2025-02-14"
            />
          </div>
          <div className="relative">
            <input
              type="date"
              className="w-full rounded border px-3 py-2"
              defaultValue="2025-02-16"
            />
          </div>
          <div className="relative">
            <select className="w-full appearance-none rounded border bg-white px-3 py-2">
              <option>STATUS</option>
              <option>Booked</option>
              <option>Checked In</option>
              <option>Checked Out</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Guest Name"
              className="w-full rounded border py-2 pl-10 pr-3"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Confirmation No."
              className="w-full rounded border px-3 py-2"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Room Number"
              className="w-full rounded border px-3 py-2"
            />
          </div>
          <button className="flex items-center justify-center gap-2 rounded bg-[#00A3E0] px-4 py-2 text-white hover:bg-[#0093c9]">
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="relative overflow-x-auto">
          {bookingData.map((reservation, index) => (
            <div
              key={index}
              className="grid grid-cols-6 gap-4 border-b py-4 last:border-0"
            >
              <div>
                <div className="text-sm text-gray-600">Conf#</div>
                <div className="flex items-center gap-2">
                  {reservation.confirmationNumber}
                  <Link
                    href={{
                      pathname: "/arrival",
                      query: {
                        profileName: reservation.profileName,
                        reservationNumber: reservation.reservationNumber,
                        confirmationNumber: reservation.confirmationNumber,
                        checkInDate: reservation.checkInDate,
                        checkOutDate: reservation.checkOutDate,
                        roomSelection: reservation.roomSelection,
                        paymentMethod: reservation.paymentMethod,
                      },
                    }}
                  >
                    <span className="cursor-pointer rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
                      Booked
                    </span>
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Guest</div>
                <div>{reservation.profileName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Check In/Out</div>
                <div>{reservation.checkInDate}</div>
                <div>{reservation.checkOutDate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Room Selection</div>
                <div>{reservation.roomSelection}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Payment Method</div>
                <div className="text-[#00A3E0]">
                  {reservation.paymentMethod}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Company</div>
                <div className="text-[#00A3E0]">
                  {reservation.reservationNumber}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
