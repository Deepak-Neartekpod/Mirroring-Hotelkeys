"use client"; // Mark this as a Client Component

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Use useSearchParams instead of useRouter
import { CheckCircle, CreditCard, Mail, Smartphone } from "lucide-react";
import { bookingData } from "@/data/data"; // Import your mock data

export default function Departure() {
  const searchParams = useSearchParams(); // Access query parameters
  const [reservationDetails, setReservationDetails] = useState(null);
  const [totalBill, setTotalBill] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("pending");

  // Get query parameters
  const confirmationNumber = searchParams.get("confirmationNumber");
  const profileName = searchParams.get("profileName");
  const roomType = searchParams.get("roomType");

  // Mock reservation details (replace with actual data if needed)
  const mockReservation = {
    confirmationNumber,
    profileName,
    roomType,
    email: "guest@example.com",
    phone: "+1234567890",
    roomCharge: 200, // Mock room charge
    additionalCharges: 50, // Mock additional charges (e.g., minibar, room service)
  };

  // Calculate total bill (room charges + additional services + taxes)
  useEffect(() => {
    if (confirmationNumber) {
      setReservationDetails(mockReservation);
      const roomCharge = mockReservation.roomCharge || 0;
      const additionalCharges = mockReservation.additionalCharges || 0;
      const tax = (roomCharge + additionalCharges) * 0.1; // 10% tax
      setTotalBill(roomCharge + additionalCharges + tax);
    }
  }, [confirmationNumber]);

  // Mock payment processing
  const handleCheckout = () => {
    setTimeout(() => {
      setPaymentStatus("paid");
      alert("Payment successful! A confirmation has been sent to your email.");
    }, 2000); // Simulate a 2-second delay for payment processing
  };

  if (!reservationDetails) {
    return <div>Loading reservation details...</div>;
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-300 dark:bg-gray-900 dark:ring-gray-700">
      <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
        Checkout Details
      </h2>

      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Confirmation Number: {reservationDetails.confirmationNumber}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Guest Name: {reservationDetails.profileName}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Room Type: {reservationDetails.roomType}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Final Bill
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Room Charge: ${reservationDetails.roomCharge.toFixed(2)}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Additional Charges: ${reservationDetails.additionalCharges.toFixed(2)}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Tax (10%): ${(totalBill - reservationDetails.roomCharge - reservationDetails.additionalCharges).toFixed(2)}
        </p>
        <p className="mt-2 text-lg font-bold text-gray-800 dark:text-white">
          Total Amount: ${totalBill.toFixed(2)}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Payment Status: {paymentStatus.toUpperCase()}
        </h3>
        {paymentStatus === "pending" && (
          <button
            onClick={handleCheckout}
            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#5750F1] px-5 py-2 text-white transition-all hover:bg-[#4940D3]"
          >
            <CreditCard className="h-5 w-5" />
            Pay Now
          </button>
        )}
      </div>

      <div className="mt-6">
        <p className="text-gray-600 dark:text-gray-400">
          A confirmation will be sent to:
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <span>{reservationDetails.email}</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <span>{reservationDetails.phone}</span>
        </div>
      </div>
    </div>
  );
}