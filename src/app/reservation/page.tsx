"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui-elements/button";
import { User, Calendar, BedDouble, CheckCircle, Hash, Key } from "lucide-react";
import { idValues } from "@/data/data";

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    profileName: "",
    email: "",
    adults: 1,
    rooms: 1,
    roomType: Object.keys(idValues)[0],
    arrivalDate: "",
    departureDate: "",
  });

  // Add new state for nights
  const [nights, setNights] = useState<number | string>('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingSummary, setBookingSummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const arrivalDateRef = useRef<HTMLInputElement>(null);
  const departureDateRef = useRef<HTMLInputElement>(null);

  const handleIncrement = (field: string) => {
    setFormData((prev) => ({ ...prev, [field]: prev[field] + 1 }));
  };

  const handleDecrement = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field] > 0 ? prev[field] - 1 : 0,
    }));
  };

  // Add this function to handle name input validation
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow letters and spaces
    if (value === '' || /^[A-Za-z\s]*$/.test(value)) {
      setFormData((prev) => ({ ...prev, profileName: value }));
    }
  };

  // Add this function to handle email input validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value === '' || emailRegex.test(value)) {
      setFormData((prev) => ({ ...prev, email: value }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Enhanced profile name validation
    if (!formData.profileName.trim()) {
      newErrors.profileName = "Guest name is required.";
    } else if (formData.profileName.length < 3) {
      newErrors.profileName = "Guest name must be at least 3 characters.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.profileName)) {
      newErrors.profileName = "Guest name can only contain letters.";
    }

    // Date validations
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const arrivalDate = new Date(formData.arrivalDate);
    const departureDate = new Date(formData.departureDate);

    if (!formData.arrivalDate) {
      newErrors.arrivalDate = "Arrival date is required.";
    } else if (arrivalDate < currentDate) {
      newErrors.arrivalDate = "Arrival date cannot be in the past.";
    }

    if (!formData.departureDate) {
      newErrors.departureDate = "Departure date is required.";
    } else if (departureDate <= arrivalDate) {
      newErrors.departureDate = "Departure date must be after arrival date.";
    }

    // Adults validation
    if (formData.adults < 1) {
      newErrors.adults = "At least 1 adult is required.";
    } else if (formData.adults > 4) {
      newErrors.adults = "Maximum 4 adults allowed per booking.";
    }

    // Rooms validation
    if (formData.rooms < 1) {
      newErrors.rooms = "At least 1 room is required.";
    } else if (formData.rooms > 5) {
      newErrors.rooms = "Maximum 5 rooms allowed per booking.";
    }

    // Room type validation
    if (!formData.roomType || !idValues[formData.roomType as keyof typeof idValues]) {
      newErrors.roomType = "Please select a valid room type.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add new helper function to generate confirmation number
  const generateConfirmationNumber = () => {
    let confirmationNumber;
    do {
      confirmationNumber = Math.floor(10000000 + Math.random() * 89999999).toString();
    } while (confirmationNumber.startsWith('4'));
    return confirmationNumber;
  };

  // Add new helper function to generate room number
  const generateRoomNumber = () => {
    return (Math.floor(100 + Math.random() * 900)).toString().slice(0, 3);
  };

  // Update the calculate nights function
  const calculateNights = (arrival: string, departure: string) => {
    if (!arrival || !departure) return '';
    const start = new Date(arrival);
    const end = new Date(departure);
    const diffTime = end.getTime() - start.getTime();
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Update room type handling
    const selectedRoom = idValues[formData.roomType as keyof typeof idValues];
    const nights = Math.ceil(
      (new Date(formData.departureDate).getTime() - new Date(formData.arrivalDate).getTime()) / (1000 * 3600 * 24)
    );
    const totalCost = selectedRoom ? selectedRoom.price * nights * formData.rooms : 0;

    // Set booking summary with updated room type handling
    setBookingSummary({
      confirmationNumber: generateConfirmationNumber(),
      roomNumber: generateRoomNumber(),
      profileName: formData.profileName,
      email: formData.email,
      arrivalDate: formData.arrivalDate,
      departureDate: formData.departureDate,
      roomType: selectedRoom?.label,
      roomTypeCode: formData.roomType,
      adults: formData.adults,
      rooms: formData.rooms,
      totalCost: totalCost.toFixed(2),
    });

    // Update the bookingData array (assuming it's imported from @/data/data)
    const newBooking = {
      confirmationNumber: generateConfirmationNumber(),
      profileName: formData.profileName,
      roomType: selectedRoom?.label || "",
      roomNumber: generateRoomNumber(),
      checkInDate: formData.arrivalDate,
    };

    // You'll need to implement a way to update the bookingData
    // This could be through a context, Redux store, or API call
    // For now, we'll just log it
    console.log("New booking to be added:", newBooking);

    setIsLoading(false);
  };

  const handlePayment = async () => {
    setIsLoading(true);

    // Simulate payment processing
    const paymentSuccess = await processPayment(bookingSummary);
    if (paymentSuccess) {
      alert("Booking confirmed!");
      setBookingSummary(null); // Reset form after successful booking
      setFormData({
        profileName: "",
        email: "",
        adults: 1,
        rooms: 1,
        roomType: Object.keys(idValues)[0],
        arrivalDate: "",
        departureDate: "",
      });
    } else {
      alert("Payment failed. Please try again.");
    }

    setIsLoading(false);
  };

  const inputBaseClasses =
    "mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm placeholder-gray-500 focus:border-[#5750F1] focus:outline-none focus:ring-2 focus:ring-[#5750F1]";

  return (
    <div className="rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-300 dark:bg-gray-900 dark:ring-gray-700">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Make a Reservation
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Experience luxury and comfort like never before.
        </p>
      </div>

      {bookingSummary ? (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex items-center space-x-4 pb-6 border-b border-gray-100">
            <div className="p-3 bg-[#5750F1]/10 rounded-full">
              <CheckCircle className="h-6 w-6 text-[#5750F1]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Booking Summary</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Details Card */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Booking Details</h3>
              <div className="flex items-center space-x-3">
                <Hash className="h-5 w-5 text-[#5750F1]" />
                <div>
                  <p className="text-sm text-gray-500">Confirmation Number</p>
                  <p className="font-semibold text-gray-900">{bookingSummary.confirmationNumber}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Key className="h-5 w-5 text-[#5750F1]" />
                <div>
                  <p className="text-sm text-gray-500">Room Number</p>
                  <p className="font-semibold text-gray-900">{bookingSummary.roomNumber}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-[#5750F1]" />
                <div>
                  <p className="text-sm text-gray-500">Guest Name</p>
                  <p className="font-semibold text-gray-900">{bookingSummary.profileName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-[#5750F1]" />
                <div>
                  <p className="text-sm text-gray-500">Guest Email</p>
                  <p className="font-semibold text-gray-900">{bookingSummary.email}</p>
                </div>
              </div>
            </div>

            {/* Secondary Details Card */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Stay Details</h3>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-[#5750F1]" />
                <div>
                  <p className="text-sm text-gray-500">Check-in</p>
                  <p className="font-semibold text-gray-900">{bookingSummary.arrivalDate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-[#5750F1]" />
                <div>
                  <p className="text-sm text-gray-500">Check-out</p>
                  <p className="font-semibold text-gray-900">{bookingSummary.departureDate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <BedDouble className="h-5 w-5 text-[#5750F1]" />
                <div>
                  <p className="text-sm text-gray-500">Room Type</p>
                  <p className="font-semibold text-gray-900">{bookingSummary.roomType}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-sm text-gray-500">Total Cost</p>
                  <p className="text-2xl font-bold text-[#5750F1]">${bookingSummary.totalCost}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Button
              type="button"
              label="Confirm Reservation"
              icon={<CheckCircle className="h-5 w-5" />}
              onClick={handlePayment}
              disabled={isLoading}
              className="bg-[#5750F1] hover:bg-[#4740E1] transform transition-transform hover:scale-105"
            />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Guest Name and Email in one row */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium text-gray-800 mb-2">Guest Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter guest name"
                  value={formData.profileName}
                  onChange={handleNameChange}
                  className={`${inputBaseClasses} pl-10`}
                />
              </div>
              {errors.profileName && <p className="text-red-500 text-sm mt-1">{errors.profileName}</p>}
            </div>

            <div className="flex-1">
              <label className="block font-medium text-gray-800 mb-2">Guest Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter guest email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  className={`${inputBaseClasses}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Dates in one row */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium text-gray-800 mb-2">Check-In Date</label>
              <div className="relative">
                <input
  type="date"
  id="arrivalDate"
  value={formData.arrivalDate}
  onChange={(e) => setFormData((prev) => ({ ...prev, arrivalDate: e.target.value }))}
  onFocus={(e) => e.target.showPicker()} // Opens the date picker when clicked
  className={inputBaseClasses}
/>
              </div>
              {errors.arrivalDate && <p className="text-red-500 text-sm mt-1">{errors.arrivalDate}</p>}
            </div>

            <div className="flex-1">
              <label className="block font-medium text-gray-800 mb-2">Check-out Date</label>
              <div className="relative">

                <input
  type="date"
  id="departureDate"
  value={formData.departureDate}
  onChange={(e) => setFormData((prev) => ({ ...prev, departureDate: e.target.value }))}
  onFocus={(e) => e.target.showPicker()} // Opens the date picker when clicked
  className={inputBaseClasses}
/>
              </div>
              {errors.departureDate && <p className="text-red-500 text-sm mt-1">{errors.departureDate}</p>}
            </div>

            <div className="w-32">
              <label className="block font-medium text-gray-800 mb-2">Nights</label>
              <input
                type="text"
                value={nights}
                readOnly
                className={`${inputBaseClasses} bg-gray-50`}
                placeholder="Nights"
              />
            </div>
          </div>

          {/* Guest Counts and Room Type in one row */}
          <div className="flex gap-6">
            <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
              <label className="block font-medium text-gray-800 mb-2">Adults</label>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDecrement("adults")}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <span className="text-lg font-medium">{formData.adults}</span>
                <button
                  type="button"
                  onClick={() => handleIncrement("adults")}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              {errors.adults && <p className="text-red-500 text-sm mt-1">{errors.adults}</p>}
            </div>

            <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
              <label className="block font-medium text-gray-800 mb-2">Rooms</label>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDecrement("rooms")}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <span className="text-lg font-medium">{formData.rooms}</span>
                <button
                  type="button"
                  onClick={() => handleIncrement("rooms")}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
              <label className="block font-medium text-gray-800 mb-2">Room Type</label>
              <div className="relative">
                <BedDouble className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={formData.roomType}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, roomType: e.target.value }))
                  }
                  className={`${inputBaseClasses} pl-10`}
                >
                  {Object.entries(idValues).map(([code, { label, price }]) => (
                    <option key={code} value={code}>
                      {code} - {label} (${price}/night)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <Button
              type="submit"
              label="Continue to Book"
              icon={<CheckCircle className="h-5 w-5" />}
              disabled={isLoading}
            />
          </div>
        </form>
      )}
    </div>
  );
}

// Mock API functions
const checkAvailability = async (formData: any) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return true; // Assume room is always available for demo
};

const processPayment = async (bookingSummary: any) => {
  // Simulate payment processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return true; // Assume payment is always successful for demo
};