import * as Icons from "../icons";

// Define the types for the navigation items
interface SubItem {
  title: string;
  url: string;
}

interface Item {
  title: string;
  url?: string;
  icon: (props: any) => JSX.Element; // Adjust the type as necessary
  items?: SubItem[];
}

interface Section {
  label: string;
  items: Item[];
}

export const NAV_DATA: Section[] = [
  {
    label: "Dashboard",
    items: [
      {
        title: "Departures",
        url: "/departures",
        icon: Icons.User,
        items: [],
      },
      {
        title: "In House",
        url: "/inhouse",
        icon: Icons.Table,
      },
      {
        title: "Arrivals",
        url: "/arrivals",
        icon: Icons.Table,
      },
      {
        title: "Availability",
        url: "/availability",
        icon: Icons.Table,
      },
    ],
  },
];
