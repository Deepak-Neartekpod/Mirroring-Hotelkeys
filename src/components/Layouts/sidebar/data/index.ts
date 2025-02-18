import * as Icons from "../icons";

export const NAV_DATA: Section[] = [
  {
    label: "Dashboard",
    items: [
      {
        title: "Reservations",
        url: "/reservation",
        icon: Icons.ReservationIcon,
      },
      {
        title: "Check-In",
        url: "/checkin",
        icon: Icons.CheckInIcon,
      },
      {
        title: "Walk-In",
        url: "/walkin",
        icon: Icons.WalkInIcon,
      },
      {
        title: "Check-Out",
        url: "/checkout",
        icon: Icons.CheckOutIcon,
      },
      {
        title: "Availability",
        url: "/availability",
        icon: Icons.AvailabilityIcon,
      },
      {
        title: "Reports",
        url: "/reports",
        icon: Icons.ReportsIcon,
      },
    ],
  },
];