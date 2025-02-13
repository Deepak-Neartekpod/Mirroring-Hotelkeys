"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui-elements/button";

const CheckOut = () => {
  const [bookingId, setBookingId] = useState("");

  const handleCheckOut = () => {
    // Handle check-out logic here
  };

  return (
    <div className="bg-gray-100 p-6 dark:bg-gray-900">
      <h1 className="text-2xl font-semibold">Check-Out</h1>

      <div className="mt-6">
        {/* Card: Search Reservation */}
        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="text-xl font-semibold">Search Reservation</h2>
          <input
            type="text"
            placeholder="Booking ID"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
      </div>

      {/* Final Button */}
      <div className="mt-4">
        <Button label="Complete Check-Out" onClick={handleCheckOut} />
      </div>
    </div>
  );
};

export default CheckOut;