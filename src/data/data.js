const data = {
  rooms: [
    {
      type: "Preferred Two Queen Beds",
      rates: [
        { label: "Best Available Rate", price: 214, tax: 29.96, available: 1 },
        { label: "COMP", price: 0, tax: 0, available: 1 },
      ],
    },
    {
      type: "Classic King Bed",
      rates: [
        { label: "Best Available Rate", price: 179, tax: 25.06, available: 0 },
        { label: "COMP", price: 0, tax: 0, available: 0 },
      ],
    },
    {
      type: "Classic King Bed Accessible",
      rates: [
        { label: "Best Available Rate", price: 179, tax: 25.06, available: 0 },
        { label: "COMP", price: 0, tax: 0, available: 0 },
      ],
    },
  ],
  house: {
    inHouse: 12,
    departures: 3,
    dirtyRooms: 5,
    readyRooms: 7,
  },
  bookings: {
    arrivals: 8,
    noShowLateCancel: 2,
    groups: 3,
    todayBooked: 5,
  },
  availability: {
    totalRooms: 60,
    sold: 25,
    available: 35,
  },
};

export default data;

export const bookingData = [
  {
    profileName: "John Doe",
    confirmationNumber: "43128901",
    roomType: "KNGN", // King Non-Smoking
    roomNumber: "101",
    checkInDate: "2025-02-17", // Today's date
    status: "Arrival", // Initial status
  },
  {
    profileName: "Jane Smith",
    confirmationNumber: "56872109",
    roomType: "TQNN", // Two Queen Beds Non-Smoking
    roomNumber: "202",
    checkInDate: "2025-02-17", // Today's date
    status: "Arrival", // Initial status
  },
  {
    profileName: "Alice Johnson",
    confirmationNumber: "23147561",
    roomType: "TDBN", // Two Double Beds Non-Smoking
    roomNumber: "303",
    checkInDate: "2025-02-20", // Future date
    status: "Reserved", // Initial status
  },
  {
    profileName: "Michael Brown",
    confirmationNumber: "67834512",
    roomType: "KNGS", // King Smoking
    roomNumber: "104",
    checkInDate: "2025-02-19", // Future date
    status: "Reserved", // Initial status
  },
  {
    profileName: "Emily Davis",
    confirmationNumber: "12983745",
    roomType: "QQNS", // Queen-Queen Non-Smoking
    roomNumber: "205",
    checkInDate: "2025-02-18", // Future date
    status: "Reserved", // Initial status
  },
];
