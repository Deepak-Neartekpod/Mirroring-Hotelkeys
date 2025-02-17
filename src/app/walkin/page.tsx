'use client';

import { Button } from "@/components/ui-elements/button";
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type GuestInfo = {
  name: string;
  contact: string;
  identification: string;
  roomType: string;
  paymentMethod: string;
  preferences?: string;
  loyalty?: boolean;
};

export default function WalkInPage() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<GuestInfo>();
  const [availableRooms, setAvailableRooms] = useState<string[]>([]);
  const [selectedRate, setSelectedRate] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [checkInMessage, setCheckInMessage] = useState<string>('');

  // Mock data for available rooms by room type
  const roomsData: { [key: string]: string[] } = {
    single: ['101', '102', '103'],
    double: ['201', '202', '203'],
    suite: ['301', '302'],
  };

  // Mock data for room rates
  const roomRates: { [key: string]: number } = {
    single: 100,
    double: 150,
    suite: 250,
  };

  // Simulate fetching available rooms and rate based on room type
  const onRoomTypeChange = (roomType: string) => {
    setTimeout(() => {
      setAvailableRooms(roomsData[roomType] || []);
      setSelectedRate(roomRates[roomType] || null);
    }, 500);
  };

  // Watch for room type changes
  const watchRoomType = watch('roomType');
  useEffect(() => {
    if (watchRoomType) {
      onRoomTypeChange(watchRoomType);
    } else {
      setAvailableRooms([]);
      setSelectedRate(null);
    }
  }, [watchRoomType]);

  // Handle form submission
  const onSubmit: SubmitHandler<GuestInfo> = (data) => {
    setIsProcessing(true);
    setCheckInMessage('');

    // Simulate check-in process (availability check & payment processing)
    setTimeout(() => {
      if (availableRooms.length > 0) {
        const assignedRoom = availableRooms[0];
        setCheckInMessage(
          `Check-in successful! ${data.name} has been assigned room ${assignedRoom} at a rate of $${selectedRate}.`
        );
      } else {
        setCheckInMessage('Selected room type is not available.');
      }
      setIsProcessing(false);
    }, 1500);
  };

  // Base styling for inputs and selects
  const inputBaseClasses =
    'mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm placeholder-gray-400 transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600';

  // Enhanced styling for guest preferences textarea
  const textareaBaseClasses =
    'mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-md placeholder-gray-400 transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600';

  return (
    <div className="bg-gray-100 p-6 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Walk-In Guest Check-In
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Guest Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name', { required: 'Name is required' })}
                className={inputBaseClasses}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Contact Information */}
            <div className="mb-4">
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Contact Information
              </label>
              <input
                id="contact"
                type="text"
                {...register('contact', { required: 'Contact information is required' })}
                className={inputBaseClasses}
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
              )}
            </div>

            {/* Identification */}
            <div className="mb-4">
              <label htmlFor="identification" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Identification
              </label>
              <input
                id="identification"
                type="text"
                {...register('identification', { required: 'Identification is required' })}
                className={inputBaseClasses}
              />
              {errors.identification && (
                <p className="text-red-500 text-sm mt-1">{errors.identification.message}</p>
              )}
            </div>

            {/* Room Type */}
            <div className="mb-4">
              <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Room Type
              </label>
              <select
                id="roomType"
                {...register('roomType', { required: 'Room type is required' })}
                className={inputBaseClasses}
              >
                <option value="">Select room type</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
              </select>
              {errors.roomType && (
                <p className="text-red-500 text-sm mt-1">{errors.roomType.message}</p>
              )}
            </div>

            {/* Payment Method */}
            <div className="mb-4">
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                {...register('paymentMethod', { required: 'Payment method is required' })}
                className={inputBaseClasses}
              >
                <option value="">Select payment method</option>
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="cash">Cash</option>
              </select>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>
              )}
            </div>

            {/* Guest Preferences */}
            <div className="mb-4">
              <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Guest Preferences
              </label>
              <textarea
                id="preferences"
                {...register('preferences')}
                placeholder="Any specific preferences?"
                rows={4}
                className={textareaBaseClasses}
              />
            </div>

            {/* Loyalty Program */}
            <div className="mb-4 flex items-center">
              <input
                id="loyalty"
                type="checkbox"
                {...register('loyalty')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="loyalty" className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Enroll in Loyalty Program
              </label>
            </div>

            {/* Display Room Rate if available */}
            {selectedRate && (
              <div className="mb-4">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Room Rate: ${selectedRate}
                </p>
              </div>
            )}

            {/* Centered Check-In Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                label={isProcessing ? 'Processing...' : 'Check In'}
                disabled={isProcessing}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
              />
            </div>
          </form>
        </div>

        {/* Available Rooms Section */}
        {availableRooms.length > 0 && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Available Rooms for Selected Type
            </h2>
            <ul className="list-disc list-inside">
              {availableRooms.map((room, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-200">
                  {room}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Check-In Message */}
        {checkInMessage && (
          <div className="mt-6 p-4 bg-green-100 rounded-md">
            <p className="text-green-700">{checkInMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
