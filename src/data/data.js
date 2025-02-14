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
    reservationNumber: "RES123456",
    confirmationNumber: "CONF789012",
    checkInDate: "2025-02-14",
    checkOutDate: "2025-02-16",
    roomSelection: "Preferred Two Queen Beds",
    paymentMethod: "Credit Card",
  },
  {
    profileName: "Jane Smith",
    reservationNumber: "RES654321",
    confirmationNumber: "CONF210987",
    checkInDate: "2025-03-01",
    checkOutDate: "2025-03-05",
    roomSelection: "Classic King Bed",
    paymentMethod: "Debit Card",
  },
  {
    profileName: "Alice Johnson",
    reservationNumber: "RES789654",
    confirmationNumber: "CONF456123",
    checkInDate: "2025-04-10",
    checkOutDate: "2025-04-15",
    roomSelection: "Classic King Bed Accessible",
    paymentMethod: "PayPal",
  },
];
