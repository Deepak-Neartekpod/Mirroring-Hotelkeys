"use client";

import { useState } from "react";
import { Button } from "@/components/ui-elements/button";
import { User, Calendar, BedDouble, CheckCircle } from "lucide-react";
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

    // Calculate total cost
    const selectedRoom = roomTypes.find((room) => room.value === formData.roomType);
    const nights = Math.ceil(
      (new Date(formData.departureDate).getTime() - new Date(formData.arrivalDate).getTime()) / (1000 * 3600 * 24)
    );
    const totalCost = selectedRoom ? selectedRoom.rate * nights * formData.rooms : 0;

    // Set booking summary
    setBookingSummary({
      profileName: formData.profileName,
      arrivalDate: formData.arrivalDate,
      departureDate: formData.departureDate,
      roomType: selectedRoom?.label,
      adults: formData.adults,
      children: formData.children,
      rooms: formData.rooms,
      totalCost: totalCost.toFixed(2),
    });

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
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Booking Summary</h3>
            <div className="space-y-4">
              <p><strong>Guest Name:</strong> {bookingSummary.profileName}</p>
              <p><strong>Arrival Date:</strong> {bookingSummary.arrivalDate}</p>
              <p><strong>Departure Date:</strong> {bookingSummary.departureDate}</p>
              <p><strong>Room Type:</strong> {bookingSummary.roomType}</p>
              <p><strong>Adults:</strong> {bookingSummary.adults}</p>
              <p><strong>Children:</strong> {bookingSummary.children}</p>
              <p><strong>Rooms:</strong> {bookingSummary.rooms}</p>
              <p><strong>Total Cost:</strong> ${bookingSummary.totalCost}</p>
            </div>
            <div className="flex justify-center">
              <Button
                type="button"
                label="Confirm and Pay"
                icon={<CheckCircle className="h-5 w-5" />}
                onClick={handlePayment}
                disabled={isLoading}
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