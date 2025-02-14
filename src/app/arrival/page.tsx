"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui-elements/button";

const paymentMethods = ["Credit Card", "Debit Card", "PayPal"]; // Define available payment methods

export default function CheckIn() {
  const [name, setName] = useState("");
  const [reservationNumber, setReservationNumber] = useState("");
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [room, setRoom] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]); // Initialize with the first method
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    // Get query params from the URL
    const urlParams = new URLSearchParams(window.location.search);
    setName(urlParams.get("profileName") || "");
    setReservationNumber(urlParams.get("reservationNumber") || "");
    setConfirmationNumber(urlParams.get("confirmationNumber") || "");
    setCheckInDate(urlParams.get("checkInDate") || "");
    setRoom(urlParams.get("roomSelection") || "");
    setPaymentMethod(urlParams.get("paymentMethod") || paymentMethods[0]);
  }, []);

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
        {/* Profile Details */}
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Profile Details
          </h2>
          <div className="mt-4 space-y-2">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Reservation Number */}
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Reservation Number
          </h2>
          <div className="mt-4 space-y-2">
            <input
              type="text"
              placeholder="Reservation Number"
              value={reservationNumber}
              onChange={(e) => setReservationNumber(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Confirmation Number */}
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Confirmation Number
          </h2>
          <div className="mt-4 space-y-2">
            <input
              type="text"
              placeholder="Confirmation Number"
              value={confirmationNumber}
              onChange={(e) => setConfirmationNumber(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Check-In Date */}
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Check-In Date
          </h2>
          <div className="mt-4">
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Room Selection */}
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Room Selection
          </h2>
          <div className="mt-4">
            <select
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="">Select a room</option>
              <option value="101">Room 101</option>
              <option value="102">Room 102</option>
              <option value="103">Room 103</option>
            </select>
          </div>
        </div>

        {/* Payment Type */}
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Payment Type
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
              onClick={() => setShowPaymentForm(true)}
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
