"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui-elements/button";
import { bookingData } from "@/data/data"; // Adjust the path as necessary

const paymentMethods = ["Credit Card", "Debit Card", "PayPal"]; // Define available payment methods

export default function CheckIn() {
  const [name, setName] = useState(bookingData.name || "");
  const [bookingId, setBookingId] = useState("");
  const [room, setRoom] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]); // Initialize with the first method
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleCheckIn = () => {
    // Handle check-in logic here
  };

  const handleAuthorizePayment = () => {
    setShowPaymentForm(true);
  };

  return (
    <div className="bg-gray-100 p-6 dark:bg-gray-900">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-semibold">Check-In</h1>
        <Button label="Complete Check-In" onClick={handleCheckIn} />
      </div>

      {/* Grid Layout */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {/* Search Reservation */}
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Search Reservation
          </h2>
          <div className="mt-4 space-y-2">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Booking ID"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Guest Details */}
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Guest Details
          </h2>
          <div className="mt-4 space-y-2 text-gray-700 dark:text-gray-200">
            <p>Name: {name || "N/A"}</p>
            <p>Booking ID: {bookingId || "N/A"}</p>
            <p>Payment Method: {paymentMethod}</p>
          </div>
        </div>

        {/* Assign Room */}
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Assign Room
          </h2>
          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="mt-4 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >
            <option value="">Select a room</option>
            <option value="101">Room 101</option>
            <option value="102">Room 102</option>
            <option value="103">Room 103</option>
          </select>
        </div>

        {/* Payment */}
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Payment
          </h2>
          <div className="mt-4">
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)} // Update payment method on change
              className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
            <Button
              label="Authorize Payment"
              onClick={handleAuthorizePayment}
            />
          </div>
        </div>

        {/* Issue Key */}
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Issue Key
          </h2>
          <div className="mt-4">
            <Button label="Generate Key Card" onClick={handleCheckIn} />
          </div>
        </div>
      </div>

      {/* Payment Details Form */}
      {showPaymentForm && (
        <div className="mt-6 rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Payment Details
          </h2>
          <form className="mt-4 space-y-2">
            <input
              type="number"
              placeholder="Card Number"
              className="w-3/4 rounded-md border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              required
            />
            <input
              type="text"
              placeholder="Cardholder Name"
              className="w-3/4 rounded-md border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              required
            />
            <input
              type="text"
              placeholder="Expiration Date (MM/YY)"
              className="w-3/4 rounded-md border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              required
            />
            <input
              type="number"
              placeholder="CVV"
              className="w-3/4 rounded-md border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              required
            />
          </form>
          <Button label="Submit Payment" onClick={handleCheckIn} />
        </div>
      )}
    </div>
  );
}
