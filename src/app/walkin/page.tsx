"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui-elements/button";

const WalkIn = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const handleWalkIn = () => {
    // Handle walk-in logic here
  };

  return (
    <div className="bg-gray-100 p-6 dark:bg-gray-900">
      <h1 className="text-2xl font-semibold">Walk-In</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Card 1: Guest Details */}
        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="text-xl font-semibold">Guest Details </h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        {/* Card 2: Assign Room */}
        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="text-xl font-semibold">Assign Room 🏠</h2>
          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select a room</option>
            <option value="101">Room 101</option>
            <option value="102">Room 102</option>
            <option value="103">Room 103</option>
          </select>
        </div>
      </div>

      {/* Final Button */}
      <div className="mt-4">
        <Button label="Complete Walk-In" onClick={handleWalkIn} />
      </div>
    </div>
  );
};

export default WalkIn;