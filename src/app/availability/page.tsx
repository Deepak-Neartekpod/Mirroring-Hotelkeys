"use client";

import { Button } from "@/components/ui-elements/button";
import data from "@/data/data";
import "./availability.css"; // Ensure you have a CSS file for styles

export default function Availability() {
  // Current date/time
  const currentDate = new Date();

  // Date formatting options
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  // Display string for the current date (header)
  const currentDateString = currentDate.toLocaleDateString(
    "en-US",
    dateFormatOptions,
  );

  // Check In date is today
  const checkInDateString = currentDateString;

  // Check Out date is tomorrow
  const checkOutDate = new Date(currentDate.getTime());
  checkOutDate.setDate(checkOutDate.getDate() + 1);
  const checkOutDateString = checkOutDate.toLocaleDateString(
    "en-US",
    dateFormatOptions,
  );

  return (
    <div className="availability-page bg-gray-100 p-6 dark:bg-gray-900">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-semibold">{currentDateString}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button label="Travel Agent Booking" />
          <Button label="Create Multi Room Reservation" />
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
        <Button label={`Check In: ${checkInDateString}`} />
        <Button label={`Check Out: ${checkOutDateString}`} />
        <Button label="Room Filters: Types (1)" />
        <Button label="Rate Plan: Terms (2)" />
        <Button label="Guests: 1 Adult" />
      </div>

      {/* Room Availability */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {data.rooms.map((room, index) => (
          <div
            key={index}
            className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {room.type}
            </h2>
            <div className="mt-4 space-y-4">
              {room.rates.map((rate, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-shadow hover:shadow-sm dark:border-gray-700 dark:bg-gray-900"
                >
                  {/* Rate Label + Availability Badge */}
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-medium text-gray-700 dark:text-gray-200">
                      {rate.label}
                    </p>
                    {rate.available > 0 ? (
                      <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900 dark:text-green-100">
                        Available
                      </span>
                    ) : (
                      <span className="inline-block rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700 dark:bg-red-900 dark:text-red-100">
                        Sold Out
                      </span>
                    )}
                  </div>

                  {/* Price and Tax */}
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      ${rate.price.toFixed(2)}
                    </p>
                    {rate.price > 0 && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        +${rate.tax.toFixed(2)} Tax
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
