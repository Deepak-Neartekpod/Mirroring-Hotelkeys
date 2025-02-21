"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui-elements/button";
import { CheckCircle, User, Phone, CreditCard } from "lucide-react";
import { walkInData } from "@/data/data";

type GuestInfo = {
  title: string;
  name: string;
  contact: string;
  email: string;
  identification: string;
  idType: string;
  nationality: string;
  roomType: string;
  numberOfGuests: number;
  stayDuration: number;
  paymentMethod: string;
  specialRequests?: string;
  loyalty?: boolean;
};

export default function WalkInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<GuestInfo>();

  const [availableRooms, setAvailableRooms] = useState<string[]>([]);
  const [selectedRate, setSelectedRate] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [checkInMessage, setCheckInMessage] = useState<string>("");

  // Dynamically extract available room types and their assigned rooms
  const availableRoomTypes = walkInData
    .filter((guest) => guest.status === "Available")
    .reduce<{ [key: string]: { rooms: string[]; rate: number } }>(
      (acc, guest) => {
        if (!acc[guest.roomType]) {
          acc[guest.roomType] = { rooms: [], rate: guest.rate };
        }
        acc[guest.roomType].rooms.push(guest.assignedRoom);
        return acc;
      },
      {}
    );

  const onRoomTypeChange = (roomType: string) => {
    setTimeout(() => {
      if (availableRoomTypes[roomType]) {
        setAvailableRooms(availableRoomTypes[roomType].rooms);
        setSelectedRate(availableRoomTypes[roomType].rate);
      } else {
        setAvailableRooms([]);
        setSelectedRate(null);
      }
    }, 500);
  };

  const watchRoomType = watch("roomType");
  useEffect(() => {
    if (watchRoomType) {
      onRoomTypeChange(watchRoomType);
    } else {
      setAvailableRooms([]);
      setSelectedRate(null);
    }
  }, [watchRoomType]);

  const onSubmit: SubmitHandler<GuestInfo> = (data) => {
    setIsProcessing(true);
    setCheckInMessage("");

    setTimeout(() => {
      if (availableRooms.length > 0) {
        const assignedRoom = availableRooms[0];
        setCheckInMessage(
          `Walk-in successful! ${data.name} has been assigned ${assignedRoom}.`
        );
      } else {
        setCheckInMessage("Selected room type is not available.");
      }
      setIsProcessing(false);
    }, 1500);
  };

  const inputBaseClasses =
    "mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm placeholder-gray-500 transition duration-150 ease-in-out focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600";

  return (
    <div className="rounded-xl bg-white p-8 shadow-lg ring-1 ring-gray-300 dark:bg-gray-900 dark:ring-gray-700">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Walk-In
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome to our hotel. Please provide guest details below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Guest Information Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Guest Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium text-gray-800 dark:text-white">Title</label>
              <select
                {...register("title", { required: "Title is required" })}
                className={inputBaseClasses}
              >
                <option value="">Select Title</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium text-gray-800 dark:text-white">
                Guest Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter guest name"
                  {...register("name", { required: "Name is required" })}
                  className={`${inputBaseClasses} pl-10`}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/\b\w/g, (char) => char.toUpperCase());
                  }}
                />
              </div>
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block font-medium text-gray-800 dark:text-white">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                {...register("email", { required: "Email is required" })}
                className={inputBaseClasses}
              />
            </div>
            <div>
              <label className="block font-medium text-gray-800 dark:text-white">
                Contact Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter contact number"
                  {...register("contact", { required: "Contact is required" })}
                  className={`${inputBaseClasses} pl-10`}
                />
              </div>
              {errors.contact && (
                <span className="text-red-500">{errors.contact.message}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block font-medium text-gray-800 dark:text-white">
                ID Type
              </label>
              <select
                {...register("idType", { required: "ID type is required" })}
                className={inputBaseClasses}
              >
                <option value="">Select ID Type</option>
                <option value="drivingLicense">Driving License</option>
                <option value="nationalId">National ID</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-gray-800 dark:text-white">
                Identification
              </label>
              <input
                type="text"
                placeholder="Enter ID number"
                {...register("identification", {
                  required: "Identification is required",
                })}
                className={inputBaseClasses}
              />
              {errors.identification && (
                <span className="text-red-500">{errors.identification.message}</span>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block font-medium text-gray-800 dark:text-white">
              Nationality
            </label>
            <input
              type="text"
              placeholder="Enter nationality"
              {...register("nationality", { required: "Nationality is required" })}
              className={inputBaseClasses}
            />
          </div>
        </div>

        {/* Stay Details Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Stay Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-800 dark:text-white">
                Number of Guests
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setValue("numberOfGuests", Math.max(1, watch("numberOfGuests") - 1))}
                  className="px-3 py-2 bg-gray-200 rounded-l-lg"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  {...register("numberOfGuests", { required: "Number of guests is required" })}
                  className="w-16 text-center border-t border-b border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setValue("numberOfGuests", watch("numberOfGuests") + 1)}
                  className="px-3 py-2 bg-gray-200 rounded-r-lg"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-800 dark:text-white">
                Number of Nights
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setValue("stayDuration", Math.max(1, watch("stayDuration") - 1))}
                  className="px-3 py-2 bg-gray-200 rounded-l-lg"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  {...register("stayDuration", { required: "Stay duration is required" })}
                  className="w-16 text-center border-t border-b border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setValue("stayDuration", watch("stayDuration") + 1)}
                  className="px-3 py-2 bg-gray-200 rounded-r-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block font-medium text-gray-800 dark:text-white">
              Room Type
            </label>
            <select
              {...register("roomType", { required: "Room type is required" })}
              className={inputBaseClasses}
            >
              <option value="">Select Room Type</option>
              {Object.keys(availableRoomTypes).map((roomType) => (
                <option key={roomType} value={roomType}>
                  {roomType}
                </option>
              ))}
            </select>
            {errors.roomType && (
              <span className="text-red-500">{errors.roomType.message}</span>
            )}
          </div>

          {availableRooms.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <label className="block font-medium text-gray-800 dark:text-white">
                Available Rooms
              </label>
              <ul className="list-disc pl-6 text-gray-900 dark:text-white">
                {availableRooms.map((room, index) => (
                  <li key={index}>{room}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedRate && (
            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <label className="block font-medium text-gray-800 dark:text-white">
                Room Rate
              </label>
              <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                ${selectedRate}
              </div>
            </div>
          )}
        </div>

        {/* Payment Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
          <div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="creditCard"
                  {...register("paymentMethod", { required: "Payment method is required" })}
                />
                <CreditCard className="w-5 h-5 text-gray-400" />
                <span>Credit Card</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="cash"
                  {...register("paymentMethod")}
                />
                <span>Cash</span>
              </label>
            </div>
          </div>
          {selectedRate && watch("stayDuration") && (
            <div className="mt-4">
              <label className="block font-medium text-gray-800 dark:text-white">
                Total Cost
              </label>
              <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                ${selectedRate * watch("stayDuration")}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isProcessing}
            label={isProcessing ? "Processing..." : "Complete Walk-In"}
          />
        </div>
      </form>

      {checkInMessage && (
        <div className="mt-6 text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
          <CheckCircle className="inline-block w-6 h-6 text-green-500 mr-2" />
          {checkInMessage}
        </div>
      )}
    </div>
  );
}