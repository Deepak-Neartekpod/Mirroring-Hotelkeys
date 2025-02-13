"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui-elements/button";
import { bookingData } from "@/data/data"; // Adjust the path as necessary

export default function CheckIn() {
  const [name, setName] = useState(bookingData.name || "");
  const [bookingId, setBookingId] = useState("");
  const [reservationNumber, setReservationNumber] = useState("");
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [room, setRoom] = useState("");
  const [roomType, setRoomType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(bookingData.paymentMethod || "Credit Card");
  const [checkInDate, setCheckInDate] = useState("");
  const [profileDetails, setProfileDetails] = useState("");

  const handleCheckIn = () => {
    // Handle check-in logic here
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
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Profile Details</h2>
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
              placeholder="Profile Details"
              value={profileDetails}
              onChange={(e) => setProfileDetails(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Reservation Number */}
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Reservation Number</h2>
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
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Confirmation Number</h2>
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
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Check-In Date</h2>
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
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Room Selection</h2>
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

        {/* Room Type */}
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Room Type</h2>
          <div className="mt-4">
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="">Select room type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
        </div>

        {/* Payment Method */}
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Payment Method</h2>
          <div className="mt-4 space-y-2">
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>
        </div>

        
      </div>
    </div>
  );
}
