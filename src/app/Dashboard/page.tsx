import { Button } from "@/components/ui-elements/button";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 p-6 dark:bg-gray-900">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ShowcaseSection title="House">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">5</h2>
              <p>In House</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">0</h2>
              <p>Departures</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">0</h2>
              <p>New Box 1</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">0</h2>
              <p>New Box 2</p>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Bookings">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">5</h2>
              <p>Arrivals</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">0</h2>
              <p>No Show/Late Cancel</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">0</h2>
              <p>New Box 1</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">0</h2>
              <p>New Box 2</p>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Availability">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">51</h2>
              <p>Total Rooms</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">0</h2>
              <p>Sold</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">0</h2>
              <p>New Box 1</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">0</h2>
              <p>New Box 2</p>
            </div>
          </div>
        </ShowcaseSection>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row">
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
