"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui-elements/button";

const CheckOut = () => {
  const [bookingId, setBookingId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  const handleCheckOut = () => {
    // Handle check-out logic here
    // Example: Process payment with paymentAmount, paymentMethod, and paymentDate
    console.log("Booking ID:", bookingId);
    console.log("Payment Amount:", paymentAmount);
    console.log("Payment Method:", paymentMethod);
    console.log("Payment Date:", paymentDate);
    // Add payment processing logic here
  };

  return (
    <div className="bg-gray-100 p-6 dark:bg-gray-900">
      <h1 className="text-2xl font-semibold">Check-Out</h1>

      <div className="mt-6">
        {/* Card: Search Reservation */}
        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="text-xl font-semibold">Search Reservation 🔍</h2>
          <input
            type="text"
            placeholder="Booking ID"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            className="w-full border p-2"
          />
        </div>
      </div>

      {/* Payment Details */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Payment Details 💳</h2>
        <input
          type="text"
          placeholder="Payment Amount"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          className="mb-4 w-full border p-2"
        />
        <input
          type="text"
          placeholder="Payment Method (e.g., Credit Card)"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="date"
          placeholder="Payment Date"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          className="mt-4 w-full border p-2"
        />
      </div>

      {/* Final Button */}
      <div className="mt-4">
        <Button label="Complete Check-Out" onClick={handleCheckOut} />
      </div>
    </div>
  );
};

export default CheckOut;
