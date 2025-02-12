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
        title: "Calendar",
        url: "/calendar",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Tables",
        url: "/tables",
        icon: Icons.Table,
      },
    ],
  },
];
