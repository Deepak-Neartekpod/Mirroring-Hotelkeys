import { Button } from "@/components/ui-elements/button";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import data from "@/data/data";

const Dashboard = () => {
  console.log("jfsdkcxf", data);

  return (
    <div className="bg-gray-100 p-5 dark:bg-gray-900">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ShowcaseSection title="House">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                <span className="font-bold">{data.house.inHouse}</span>
              </h2>
              <p>In House</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                <span className="font-bold">{data.house.departures}</span>
              </h2>
              <p>Departures</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                <span className="font-bold">{data.house.dirtyRooms}</span>
              </h2>
              <p>Dirty Rooms</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                <span className="font-bold">{data.house.readyRooms}</span>
              </h2>
              <p>Ready Rooms</p>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Bookings">
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/checkin"
              className="block cursor-pointer rounded-lg bg-white p-4 shadow-md"
            >
              <h2 className="text-xl font-semibold">
                <span className="font-bold">{data.bookings.arrivals}</span>
              </h2>
              <p>Arrivals</p>
            </a>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                <span className="font-bold">{data.bookings.noShowLateCancel}</span>
              </h2>
              <p>No Show/Late Cancel</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                <span className="font-bold">{data.bookings.groups}</span>
              </h2>
              <p>Groups</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                <span className="font-bold">{data.bookings.todayBooked}</span>
              </h2>
              <p>Today Booked</p>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Availability">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                <span className="font-bold">{data.availability.totalRooms}</span>
              </h2>
              <p>Total Rooms</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                <span className="font-bold">{data.availability.sold}</span>
              </h2>
              <p>Sold</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                <span className="font-bold">{data.availability.available}</span>
              </h2>
              <p>Available</p>
            </div>
          </div>
        </ShowcaseSection>
      </div>
      <div className="mt-7 grid grid-cols-1 gap-4 rounded-lg border-2 md:grid-cols-3">
        <Button label="New Booking" />
        <Button label="Group Master" />
        <Button label="Grid View & Floor Plan" />
      </div>
    </div>
  );
};

export default Dashboard;
