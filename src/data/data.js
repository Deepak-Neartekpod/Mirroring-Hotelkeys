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

export const idValues = {
  KNGN: { label: "King Non-Smoking", price: 214 },
  TQNN: { label: "Two Queen Beds Non-Smoking", price: 179 },
  TDBN: { label: "Two Double Beds Non-Smoking", price: 214 },
  KNGS: { label: "King Smoking", price: 214 },
  QQNS: { label: "Queen-Queen Non-Smoking", price: 179 },
};

export default data;

export const walkInData = [
  { 
    name: "John Doe", 
    assignedRoom: "Room 101", 
    status: "Available", 
    roomType: "KNGN", 
    rate: 214, 
    paymentMethods: ["creditCard", "cash"] 
  },
  { 
    name: "Jane Smith", 
    assignedRoom: "Room 200", 
    status: "Available", 
    roomType: "TQNN", 
    rate: 179, 
    paymentMethods: ["creditCard", "cash"] 
  },
  { 
    name: "Michael Johnson", 
    assignedRoom: "Room 310", 
    status: "Checked-in", 
    roomType: "TDBN", 
    rate: 214, 
    paymentMethods: ["creditCard", "cash"] 
  }
];

export const roomTypeOptions = ["KNGN", "TQNN", "TDBN"];

export const bookingData = [
  {
    profileName: "John Doe",
    confirmationNumber: "43128901",
    roomType: "KNGN", // King Non-Smoking
    roomNumber: "101",
    checkInDate: "2025-02-24", // Today's date
    checkOutDate: "2025-02-26", // Departure date
    status: "Checked-out", // Status after departure
    totalCharges: 500, // Total charges including room rate, taxes, and additional services
    paymentStatus: "Paid", // Payment status
  },
  {
    profileName: "Jane Smith",
    confirmationNumber: "56872109",
    roomType: "TQNN", // Two Queen Beds Non-Smoking
    roomNumber: "202",
    checkInDate: "2025-02-22", // Today's date
    checkOutDate: "2025-02-24", // Departure date
    status: "Checked-out", // Status after departure
    totalCharges: 450, // Total charges including room rate, taxes, and additional services
    paymentStatus: "Pending", // Payment status
  },
  {
    profileName: "Alice Johnson",
    confirmationNumber: "23147561",
    roomType: "TDBN", // Two Double Beds Non-Smoking
    roomNumber: "303",
    checkInDate: "2025-02-24", // Future date
    checkOutDate: "2025-02-25", // Departure date
    status: "Reserved", // Initial status
    totalCharges: 600, // Total charges including room rate, taxes, and additional services
    paymentStatus: "Pending", // Payment status
  },
  {
    profileName: "Michael Brown",
    confirmationNumber: "67834512",
    roomType: "KNGS", // King Smoking
    roomNumber: "104",
    checkInDate: "2025-02-26", // Future date
    checkOutDate: "2025-02-28", // Departure date
    status: "Reserved", // Initial status
    totalCharges: 550, // Total charges including room rate, taxes, and additional services
    paymentStatus: "Pending", // Payment status
  },
  {
    profileName: "Emily Davis",
    confirmationNumber: "12983745",
    roomType: "QQNS", // Queen-Queen Non-Smoking
    roomNumber: "205",
    checkInDate: "2025-02-25", // Future date
    checkOutDate: "2025-02-27", // Departure date
    status: "Reserved", // Initial status
    totalCharges: 400, // Total charges including room rate, taxes, and additional services
    paymentStatus: "Pending", // Payment status
  },
];

export const reports = [
  {
    id: 1,
    name: "Daily Financial Report",
  },
  {
    id: 2,
    name: "Monthly Financial Report",
  },
  {
    id: 3,
    name: "Yearly Financial Report",
  },
  {
    id: 4,
    name: "Reservation Reports",
  },
  {
    id: 5,
    name: "Housekeeping Report",
  },
  { id: 6, name: "Occupancy Report" },
  { id: 7, name: "Guest Reports"},
  { id: 9, name: "Guest Tracking"},
];



export const roomTypes = [
  { value: "KNGN", label: "King Room", rate: 214 },
  { value: "TQNN", label: "Queen Room with Two Beds", rate: 179 },
  { value: "TDBN", label: "Double Room", rate: 214 },
];
