"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { CheckCircle, CreditCard, Mail, Smartphone, User } from "lucide-react";

export default function Departure() {
  const searchParams = useSearchParams();
  const [reservationDetails, setReservationDetails] = useState(null);
  const [totalBill, setTotalBill] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [isProcessing, setIsProcessing] = useState(false);

  // Define a common styling for input fields (matching Walk-In page)
  const inputBaseClasses =
    "mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm placeholder-gray-500 transition duration-150 ease-in-out focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600";

  // Get query parameters
  const confirmationNumber = searchParams.get("confirmationNumber");
  const profileName = searchParams.get("profileName");
  const roomType = searchParams.get("roomType");

  // Mock reservation details
  const mockReservation = {
    confirmationNumber,
    profileName,
    roomType,
    email: "guest@example.com",
    phone: "+1234567890",
    roomCharge: 200,
    additionalCharges: 50,
  };

  // Calculate total bill including tax (10%)
  useEffect(() => {
    if (confirmationNumber) {
      setReservationDetails(mockReservation);
      const tax = (mockReservation.roomCharge + mockReservation.additionalCharges) * 0.1;
      setTotalBill(mockReservation.roomCharge + mockReservation.additionalCharges + tax);
    }
  }, [confirmationNumber]);

  // Updated payment processing logic with circular spinner
  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setPaymentStatus("paid");
      setIsProcessing(false);
      alert("Payment successful! A confirmation has been sent to your email.");
    }, 2000);
  };

  if (!reservationDetails) {
    return (
      <div className="text-center text-lg text-gray-600 dark:text-gray-400">
        Loading reservation details...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg ring-1 ring-gray-300 dark:bg-gray-900 dark:ring-gray-700">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
        Checkout Details
      </h2>

      {/* Guest Details */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="confirmationNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirmation Number
          </label>
          <input
            type="text"
            id="confirmationNumber"
            value={reservationDetails.confirmationNumber || ""}
            readOnly
            className={`${inputBaseClasses} bg-gray-100 dark:bg-gray-700`}
          />
        </div>
        <div>
          <label htmlFor="profileName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Guest Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="profileName"
              value={reservationDetails.profileName || ""}
              onChange={(e) =>
                setReservationDetails({ ...reservationDetails, profileName: e.target.value })
              }
              className={`${inputBaseClasses} pl-10`}
            />
          </div>
        </div>
        <div>
          <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Room Type
          </label>
          <input
            type="text"
            id="roomType"
            value={reservationDetails.roomType || ""}
            onChange={(e) =>
              setReservationDetails({ ...reservationDetails, roomType: e.target.value })
            }
            className={inputBaseClasses}
          />
        </div>
      </div>

      {/* Billing Information */}
      <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Final Bill</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Room Charge</label>
            <input
              type="text"
              value={`$${reservationDetails.roomCharge.toFixed(2)}`}
              readOnly
              className={`${inputBaseClasses} bg-gray-100 dark:bg-gray-700`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Additional Charges
            </label>
            <input
              type="text"
              value={`$${reservationDetails.additionalCharges.toFixed(2)}`}
              readOnly
              className={`${inputBaseClasses} bg-gray-100 dark:bg-gray-700`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tax (10%)
            </label>
            <input
              type="text"
              value={`$${(totalBill - reservationDetails.roomCharge - reservationDetails.additionalCharges).toFixed(2)}`}
              readOnly
              className={`${inputBaseClasses} bg-gray-100 dark:bg-gray-700`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">Total Amount</label>
            <input
              type="text"
              value={`$${totalBill.toFixed(2)}`}
              readOnly
              className={`${inputBaseClasses} bg-gray-100 dark:bg-gray-700`}
            />
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Payment Status: <span className="uppercase">{paymentStatus}</span>
        </h3>
        {paymentStatus === "pending" && (
          <div className="mt-4">
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-300 border-dashed rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <span className="text-xl font-semibold text-blue-600">Processing Payment...</span>
              </div>
            ) : (
              <Button onClick={handleCheckout} className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Pay Now
              </Button>
            )}
          </div>
        )}
        {paymentStatus === "paid" && (
          <div className="mt-4 flex items-center gap-2 text-green-600 dark:text-green-400">
            <CheckCircle className="h-5 w-5" />
            Payment Successful
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              id="email"
              value={reservationDetails.email || ""}
              onChange={(e) =>
                setReservationDetails({ ...reservationDetails, email: e.target.value })
              }
              className={`${inputBaseClasses} pl-10`}
            />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone
          </label>
          <div className="relative">
            <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              id="phone"
              value={reservationDetails.phone || ""}
              onChange={(e) =>
                setReservationDetails({ ...reservationDetails, phone: e.target.value })
              }
              className={`${inputBaseClasses} pl-10`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
