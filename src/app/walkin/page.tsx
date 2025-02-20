"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui-elements/button";
import { CheckCircle, User, Phone, CreditCard } from "lucide-react";
import { walkInData } from "@/data/data";

type GuestInfo = {
  name: string;
  contact: string;
  identification: string;
  roomType: string;
  paymentMethod: string;
  loyalty?: boolean;
};

export default function WalkInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
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
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Guest Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
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
              />
            </div>
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
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

        {/* Room Type Selection */}
        <div>
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

        {/* Available Rooms Display */}
        {availableRooms.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg">
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

        {/* Room Rate Display */}
        {selectedRate && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <label className="block font-medium text-gray-800 dark:text-white">
              Room Rate
            </label>
            <div className="text-lg font-semibold text-green-600 dark:text-green-400">
              ${selectedRate}
            </div>
          </div>
        )}

        <div>
          <label className="block font-medium text-gray-800 dark:text-white">
            Payment Method
          </label>
          <select
            {...register("paymentMethod", {
              required: "Payment method is required",
            })}
            className={inputBaseClasses}
          >
            <option value="">Select Payment Method</option>
            <option value="creditCard">Credit Card</option>
            <option value="cash">Cash</option>
          </select>
          {errors.paymentMethod && (
            <span className="text-red-500">{errors.paymentMethod.message}</span>
          )}
        </div>

        <div className="flex justify-center">
          <Button type="submit" disabled={isProcessing} label="Walk-In" />
        </div>
      </form>

      {checkInMessage && <div className="mt-6 text-center">{checkInMessage}</div>}
    </div>
  );
}
