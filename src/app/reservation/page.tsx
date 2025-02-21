"use client";

import { useState } from "react";
import { Button } from "@/components/ui-elements/button";
import { User, Calendar, BedDouble, CheckCircle, Hash, Key } from "lucide-react";
import { roomTypes } from "@/data/data"; // Ensure data is imported

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    profileName: "",
    adults: 1,
    children: 0,
    rooms: 1,
    roomType: roomTypes.length > 0 ? roomTypes[0].value : "",
    arrivalDate: "",
    departureDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingSummary, setBookingSummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleIncrement = (field: string) => {
    setFormData((prev) => ({ ...prev, [field]: prev[field] + 1 }));
  };

  const handleDecrement = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field] > 0 ? prev[field] - 1 : 0,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.profileName) newErrors.profileName = "Guest name is required.";
    if (!formData.arrivalDate) newErrors.arrivalDate = "Arrival date is required.";
    if (!formData.departureDate) newErrors.departureDate = "Departure date is required.";
    if (new Date(formData.arrivalDate) >= new Date(formData.departureDate)) {
      newErrors.departureDate = "Departure date must be after arrival date.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add new helper function to generate confirmation number
  const generateConfirmationNumber = () => {
    return Math.floor(40000000 + Math.random() * 9999999).toString();
  };

  // Add new helper function to generate room number
  const generateRoomNumber = () => {
    return (Math.floor(100 + Math.random() * 900)).toString().slice(0, 3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call to check availability
    const isAvailable = await checkAvailability(formData);
    if (!isAvailable) {
      alert("Selected room type is unavailable for the chosen dates. Please try different dates or room type.");
      setIsLoading(false);
      return;
    }

    // Generate confirmation number and room number
    const confirmationNumber = generateConfirmationNumber();
    const roomNumber = generateRoomNumber();

    // Calculate total cost
    const selectedRoom = roomTypes.find((room) => room.value === formData.roomType);
    const nights = Math.ceil(
      (new Date(formData.departureDate).getTime() - new Date(formData.arrivalDate).getTime()) / (1000 * 3600 * 24)
    );
    const totalCost = selectedRoom ? selectedRoom.rate * nights * formData.rooms : 0;

    // Set booking summary with new fields
    setBookingSummary({
      confirmationNumber,
      roomNumber,
      profileName: formData.profileName,
      arrivalDate: formData.arrivalDate,
      departureDate: formData.departureDate,
      roomType: selectedRoom?.label,
      adults: formData.adults,
      children: formData.children,
      rooms: formData.rooms,
      totalCost: totalCost.toFixed(2),
    });

    // Update the bookingData array (assuming it's imported from @/data/data)
    const newBooking = {
      confirmationNumber,
      profileName: formData.profileName,
      roomType: selectedRoom?.label || "",
      roomNumber,
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
      alert("Booking confirmed! A confirmation email has been sent to your inbox.");
      setBookingSummary(null); // Reset form after successful booking
      setFormData({
        profileName: "",
        adults: 1,
        children: 0,
        rooms: 1,
        roomType: roomTypes.length > 0 ? roomTypes[0].value : "",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#F9FAFB] to-[#EFF1F3]">
      <div className="rounded-xl bg-white p-8 shadow-2xl max-w-4xl w-full">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Make a Reservation</h2>
          <p className="mt-2 text-gray-600">
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
                  <Calendar className="h-5 w-5 text-[#5750F1]" />
                  <div>
                    <div className="space-y-1">
                      <div>
                        <p className="text-sm text-gray-500">Check-in</p>
                        <p className="font-semibold text-gray-900">{bookingSummary.arrivalDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Check-out</p>
                        <p className="font-semibold text-gray-900">{bookingSummary.departureDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Details Card */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <BedDouble className="h-5 w-5 text-[#5750F1]" />
                  <div>
                    <p className="text-sm text-gray-500">Room Details</p>
                    <p className="font-semibold text-gray-900">{bookingSummary.roomType}</p>
                    <p className="text-sm text-gray-600">
                      {bookingSummary.rooms} {bookingSummary.rooms === 1 ? 'room' : 'rooms'} · 
                      {bookingSummary.adults} {bookingSummary.adults === 1 ? 'adult' : 'adults'} · 
                      {bookingSummary.children} {bookingSummary.children === 1 ? 'child' : 'children'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Total Cost</p>
                  <p className="text-2xl font-bold text-[#5750F1]">${bookingSummary.totalCost}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Button
                type="button"
                label="Confirm and Pay"
                icon={<CheckCircle className="h-5 w-5" />}
                onClick={handlePayment}
                disabled={isLoading}
                className="bg-[#5750F1] hover:bg-[#4740E1] transform transition-transform hover:scale-105"
              />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Guest Name */}
            <div>
              <label className="block font-medium text-gray-800 mb-2">Guest Name</label>
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
              {errors.profileName && <p className="text-red-500 text-sm mt-1">{errors.profileName}</p>}
            </div>

            {/* Arrival & Departure Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-800 mb-2">Arrival Date</label>
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
                {errors.arrivalDate && <p className="text-red-500 text-sm mt-1">{errors.arrivalDate}</p>}
              </div>
              <div>
                <label className="block font-medium text-gray-800 mb-2">Departure Date</label>
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
                {errors.departureDate && <p className="text-red-500 text-sm mt-1">{errors.departureDate}</p>}
              </div>
            </div>

            {/* Room Type Selection */}
            <div>
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
                  {roomTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label} - ${type.rate}/night
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guest Counts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Adults */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
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
              </div>

              {/* Children */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <label className="block font-medium text-gray-800 mb-2">Children</label>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleDecrement("children")}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{formData.children}</span>
                  <button
                    type="button"
                    onClick={() => handleIncrement("children")}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Rooms */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
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