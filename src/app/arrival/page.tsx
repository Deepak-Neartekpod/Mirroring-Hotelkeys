"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Button } from "@/components/ui-elements/button";

export default function CheckIn() {
  const [profileName, setProfileName] = useState("");
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setProfileName(urlParams.get("profileName") || "");
    setConfirmationNumber(urlParams.get("confirmationNumber") || "");
    setRoomType(urlParams.get("roomType") || "");
    setRoomNumber(urlParams.get("roomNumber") || "");
  }, []);

  const handleCheckIn = () => {
    setShowSuccessMessage(true);

    // Redirect to the check-in page after 3 seconds
    setTimeout(() => {
      router.push("/checkin");
    }, 2000);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Check-In
        </h1>
        <Button
          label="Complete Check-In"
          onClick={handleCheckIn}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
        />
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-md dark:bg-green-900 dark:text-green-100">
          Check-in completed successfully!
        </div>
      )}

      {/* Form Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {/* Profile Name */}
        <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
            Profile Name
          </h2>
          <input
            type="text"
            placeholder="Profile Name"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            className="mt-2 w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700"
          />
        </div>

        {/* Confirmation Number */}
        <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
            Confirmation Number
          </h2>
          <input
            type="text"
            placeholder="Confirmation Number"
            value={confirmationNumber}
            onChange={(e) => setConfirmationNumber(e.target.value)}
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
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="mt-2 w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700"
          />
        </div>

        {/* Room Number */}
        <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
            Room Number
          </h2>
          <input
            type="text"
            placeholder="Room Number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="mt-2 w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700"
          />
        </div>
      </div>
    </div>
  );
}
