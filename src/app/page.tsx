import { Button } from "@/components/ui-elements/button";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Home, Clock, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900">
      {/* Top Navigation */}
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Home className="h-8 w-8 text-sky-500" />
            <button className="p-2">
              <Clock className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Sat, Aug 14, 2021</span>
            <button className="rounded-md px-4 py-2 text-gray-600 hover:bg-gray-100">
              Helpdesk
            </button>
            <span className="text-gray-600">2.0 min ago</span>
            <button className="rounded-md p-2 hover:bg-gray-100">
              <Users className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ShowcaseSection title="House">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">5</h2>
              <p>In House</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">0</h2>
              <p>Departures</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">0</h2>
              <p>New Box 1</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">0</h2>
              <p>New Box 2</p>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Bookings">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">5</h2>
              <p>Arrivals</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">0</h2>
              <p>No Show/Late Cancel</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">0</h2>
              <p>New Box 1</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">0</h2>
              <p>New Box 2</p>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Availability">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">51</h2>
              <p>Total Rooms</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">0</h2>
              <p>Sold</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">0</h2>
              <p>New Box 1</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">0</h2>
              <p>New Box 2</p>
            </div>
          </div>
        </ShowcaseSection>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <Button label="Walk-In" />
        <Button label="New Booking" />
        <Button label="End Shift" />
        <Button label="Search Reservation" />
        <Button label="Group Master" />
        <Button label="Grid View & Floor Plan" />
      </div>
    </div>
  );
};

export default Dashboard;
