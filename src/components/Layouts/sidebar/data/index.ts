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
        title: "Availability",
        url: "/availability",
        icon: Icons.AvailabilityIcon,
      },
      {
        title: "Walk-In",
        url: "/walkin",
        icon: Icons.WalkInIcon,
      },
      {
        title: "Check-In",
        url: "/checkin",
        icon: Icons.CheckInIcon,
      },
      {
        title: "Housekeeping",
        url: "/housekeeping",
        icon: Icons.HousekeepingIcon,
      },
      {
        title: "Check-Out",
        url: "/checkout",
        icon: Icons.CheckOutIcon,
      },
      {
        title: "Reports",
        url: "/reports",
        icon: Icons.ReportsIcon,
      },
    ],
  },
];
