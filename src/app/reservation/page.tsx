"use client";

import { useState } from "react";
import { Button } from "@/components/ui-elements/button";
import { User, Calendar, Users, BedDouble, CheckCircle } from "lucide-react";

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    profileName: "",
    adults: 1,
    children: 0,
    rooms: 1,
    roomType: "KNGN",
    arrivalDate: "",
    departureDate: "",
  });

  const roomTypes = [
    { value: "KNGN", label: "King Room", rate: 214 },
    { value: "TQNN", label: "Queen Room with Two Beds", rate: 179 },
    { value: "TDBN", label: "Double Room", rate: 214 },
  ];

  const handleIncrement = (field: string) => {
    setFormData((prev) => ({ ...prev, [field]: prev[field] + 1 }));
  };

  const handleDecrement = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field] > 0 ? prev[field] - 1 : 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation submitted:", formData);
  };

  const inputBaseClasses =
    "mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm placeholder-gray-500 transition duration-150 ease-in-out focus:border-[#5750F1] focus:outline-none focus:ring-2 focus:ring-[#5750F1] dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#F9FAFB] to-[#EFF1F3] dark:from-gray-900 dark:to-gray-800">
      <div className="rounded-xl bg-white p-8 shadow-2xl ring-1 ring-gray-300 dark:bg-gray-900 dark:ring-gray-700 max-w-4xl w-full">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Make a Reservation
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Experience luxury and comfort like never before.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Guest Information */}
          <div>
            <label className="block font-medium text-gray-800 dark:text-white mb-2">
              Guest Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter guest name"
                value={formData.profileName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, profileName: e.target.value }))
                }
                className={`${inputBaseClasses} pl-10`}
              />
            </div>
          </div>

          {/* Dates Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-800 dark:text-white mb-2">
                Arrival Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.arrivalDate}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, arrivalDate: e.target.value }))
                  }
                  className={`${inputBaseClasses} pl-10`}
                />
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-800 dark:text-white mb-2">
                Departure Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, departureDate: e.target.value }))
                  }
                  className={`${inputBaseClasses} pl-10`}
                />
              </div>
            </div>
          </div>

          {/* Guest Count Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Adults Counter */}
            <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <label className="block font-medium text-gray-800 dark:text-white mb-2">
                Adults
              </label>
              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDecrement("adults")}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  -
                </button>
                <span className="text-lg font-medium dark:text-white">
                  {formData.adults}
                </span>
                <button
                  type="button"
                  onClick={() => handleIncrement("adults")}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children Counter */}
            <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <label className="block font-medium text-gray-800 dark:text-white mb-2">
                Children
              </label>
              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDecrement("children")}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  -
                </button>
                <span className="text-lg font-medium dark:text-white">
                  {formData.children}
                </span>
                <button
                  type="button"
                  onClick={() => handleIncrement("children")}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Rooms Counter */}
            <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <label className="block font-medium text-gray-800 dark:text-white mb-2">
                Rooms
              </label>
              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDecrement("rooms")}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  -
                </button>
                <span className="text-lg font-medium dark:text-white">
                  {formData.rooms}
                </span>
                <button
                  type="button"
                  onClick={() => handleIncrement("rooms")}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Room Type Selection */}
          <div>
            <label className="block font-medium text-gray-800 dark:text-white mb-2">
              Room Type
            </label>
            <div className="relative">
              <BedDouble className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={formData.roomType}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, roomType: e.target.value }))
                }
                className={`${inputBaseClasses} pl-10`}
              >
                {roomTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label} - ${type.rate}/night
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <Button
              type="submit"
              label="Continue to Book"
              icon={<CheckCircle className="h-5 w-5" />}
              className="bg-[#5750F1] hover:bg-[#4940D3] text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            />
          </div>
        </form>
      </div>
    </div>
  );
}