"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui-elements/button";

const paymentMethods = ["Credit Card", "Debit Card", "PayPal"];

export default function CheckIn() {
  const [name, setName] = useState("");
  const [reservationNumber, setReservationNumber] = useState("");
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [room, setRoom] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setName(urlParams.get("profileName") || "");
    setReservationNumber(urlParams.get("reservationNumber") || "");
    setConfirmationNumber(urlParams.get("confirmationNumber") || "");
    setCheckInDate(urlParams.get("checkInDate") || "");
    setRoom(urlParams.get("roomSelection") || "");
    setPaymentMethod(urlParams.get("paymentMethod") || paymentMethods[0]);
  }, []);

  const handleCheckIn = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Check-In
        </h1>
        <Button label="Complete Check-In" onClick={handleCheckIn} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md" />
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-md dark:bg-green-900 dark:text-green-100">
           Check-in completed successfully!
        </div>
      )}

      {/* Form Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {/* Input Fields */}
        {[{
          label: "Guest Name",
          value: name,
          setValue: setName
        }, {
          label: "Reservation Number",
          value: reservationNumber,
          setValue: setReservationNumber
        }, {
          label: "Confirmation Number",
          value: confirmationNumber,
          setValue: setConfirmationNumber
        }].map(({ label, value, setValue }, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">{label}</h2>
            <input
              type="text"
              placeholder={label}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-2 w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700"
            />
          </div>
        ))}

        {/* Date Picker */}
        <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
            Check-In Date
          </h2>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="mt-2 w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700"
          />
        </div>

        {/* Room Type */}
        <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
            Room Type
          </h2>
          <input
            type="text"
            placeholder="Room Type"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="mt-2 w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700"
          />
        </div>

        {/* Payment Type */}
        <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
            Payment Type
          </h2>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-2 w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700"
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          {/* <Button
            label="Authorize Payment"
            onClick={() => setShowPaymentForm(true)}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md w-full"
          /> */}
        </div>
      </div>

      {/* Payment Details Form */}
      {showPaymentForm && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
            Payment Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {[
              { placeholder: "Card Number", type: "number" },
              { placeholder: "Cardholder Name", type: "text" },
              { placeholder: "Expiration Date (MM/YY)", type: "text" },
              { placeholder: "CVV", type: "number" },
            ].map((input, index) => (
              <input
                key={index}
                type={input.type}
                placeholder={input.placeholder}
                className="w-full p-3 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700"
                required
              />
            ))}
          </div>
          <Button
            label="Submit Payment"
            onClick={handleCheckIn}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md w-full"
          />
        </div>
      )}
    </div>
  );
}
