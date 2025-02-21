"use client";
import { useState, useEffect } from "react";
import { Search, Hash, User, BedDouble, Key, CheckCircle } from "lucide-react";
import Link from "next/link";
import { bookingData } from "@/data/data";

export default function SearchReservations() {
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState(bookingData);
  const [currentDate, setCurrentDate] = useState("");
  const [currentView, setCurrentView] = useState("list");
  const [reservations, setReservations] = useState(bookingData);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    const input = searchInput.trim();
    setFilteredData(
      input.length >= 1
        ? reservations.filter((reservation) =>
            reservation.confirmationNumber.startsWith(input)
          )
        : reservations
    );
  }, [searchInput, reservations]);

  const switchView = (view: string) => {
    setCurrentView(view);
  };

  const getStatus = (reservation: any) => {
    const reservationDate = new Date(reservation.checkInDate);
    const today = new Date();

    if (today.toDateString() === reservationDate.toDateString()) {
      return "Arrival";
    }

    if (today > reservationDate) {
      return "No Show";
    }

    return "Reserved";
  };

  const handleCheckIn = (reservation: any) => {
    const status = getStatus(reservation);

    if (status !== "Reserved") {
      const { confirmationNumber, profileName, roomType, roomNumber } = reservation;
      window.location.href = `/arrival?confirmationNumber=${confirmationNumber}&profileName=${profileName}&roomType=${roomType}&roomNumber=${roomNumber}`;
    }
  };

  // Updated Room View UI
  const renderRoomView = () => {
    const groupedByRoomType = reservations.reduce((acc, reservation) => {
      if (!acc[reservation.roomType]) {
        acc[reservation.roomType] = [];
      }
      acc[reservation.roomType].push(reservation);
      return acc;
    }, {});

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(groupedByRoomType).map((roomType) => (
          <div
            key={roomType}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{roomType}</h3>
            <div className="space-y-4">
              {groupedByRoomType[roomType].map((reservation, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-gray-200 hover:border-[#5750F1] transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">
                        {reservation.profileName}
                      </div>
                      <div className="text-sm text-gray-500">
                        Room {reservation.roomNumber}
                      </div>
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        getStatus(reservation) === "Arrival"
                          ? "text-green-600"
                          : getStatus(reservation) === "No Show"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {getStatus(reservation)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Updated Tape Chart UI
  const renderTapeChart = () => {
    const roomNumbers = Array.from(
      new Set(reservations.map((reservation) => reservation.roomNumber))
    );
    const dates = Array.from(
      new Set(reservations.map((reservation) => reservation.checkInDate))
    ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    return (
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-2">
            <div className="col-span-1 font-semibold text-gray-700">Rooms</div>
            {dates.map((date, index) => (
              <div
                key={index}
                className="col-span-1 text-center font-semibold text-gray-700"
              >
                {new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            ))}
          </div>
          {roomNumbers.map((roomNumber) => (
            <div key={roomNumber} className="grid grid-cols-8 gap-2 py-2">
              <div className="col-span-1 font-medium text-gray-900">
                Room {roomNumber}
              </div>
              {dates.map((date, index) => {
                const reservation = reservations.find(
                  (res) =>
                    res.roomNumber === roomNumber && res.checkInDate === date
                );
                return (
                  <div
                    key={index}
                    className={`col-span-1 h-12 rounded-lg flex items-center justify-center ${
                      reservation
                        ? getStatus(reservation) === "Arrival"
                          ? "bg-green-100 text-green-800"
                          : getStatus(reservation) === "No Show"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {reservation ? reservation.profileName : "Available"}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-300 dark:bg-gray-900 dark:ring-gray-700">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Check-In
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">{currentDate}</p>
      </div>

      <div className="border-b border-gray-300 pb-4 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Enter confirmation number..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5750F1]"
          />
          <button className="flex items-center justify-center gap-2 rounded-lg bg-[#5750F1] px-5 py-2 text-white transition-all hover:bg-[#4940D3]">
            <Search className="h-5 w-5" />
            Search
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-4 mb-6 flex justify-center gap-8">
        <button
          onClick={() => switchView("list")}
          className={`py-2 px-4 rounded-lg ${
            currentView === "list" ? "bg-[#5750F1] text-white" : "bg-gray-200"
          }`}
        >
          List View
        </button>
        <button
          onClick={() => switchView("room")}
          className={`py-2 px-4 rounded-lg ${
            currentView === "room" ? "bg-[#5750F1] text-white" : "bg-gray-200"
          }`}
        >
          Room View
        </button>
        <button
          onClick={() => switchView("tape")}
          className={`py-2 px-4 rounded-lg ${
            currentView === "tape" ? "bg-[#5750F1] text-white" : "bg-gray-200"
          }`}
        >
          Tape Chart
        </button>
      </div>

      {/* Content Rendering */}
      {currentView === "list" && (
        <div className="relative overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <tr className="text-center">
                <th className="px-5 py-3 font-semibold uppercase tracking-wide">
                  <div className="flex items-center justify-center gap-2">
                    <Hash className="h-4 w-4" />
                    Confirmation Number
                  </div>
                </th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wide">
                  <div className="flex items-center justify-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </div>
                </th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wide">
                  <div className="flex items-center justify-center gap-2">
                    <BedDouble className="h-4 w-4" />
                    Room Type
                  </div>
                </th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wide">
                  <div className="flex items-center justify-center gap-2">
                    <Key className="h-4 w-4" />
                    Room Number
                  </div>
                </th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wide">
                  Status
                </th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wide">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Activation
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((reservation, index) => (
                  <tr
                    key={index}
                    className="text-center text-gray-900 dark:text-white"
                  >
                    <td className="px-5 py-4">{reservation.confirmationNumber}</td>
                    <td className="px-5 py-4">{reservation.profileName}</td>
                    <td className="px-5 py-4">{reservation.roomType}</td>
                    <td className="px-5 py-4">{reservation.roomNumber}</td>
                    <td className="px-5 py-4">{getStatus(reservation)}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleCheckIn(reservation)}
                        className={`${
                          getStatus(reservation) === "Reserved"
                            ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
                            : "bg-[#5750F1] text-white hover:bg-[#4940D3]"
                        } text-sm py-2 px-4 rounded-lg transition-all duration-300`}
                      >
                        {getStatus(reservation) === "Reserved" ? "Reserved" : "Check-In"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No reservations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Render based on current view */}
      {currentView === "room" && renderRoomView()}
      {currentView === "tape" && renderTapeChart()}
    </div>
  );
}