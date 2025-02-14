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
              <h2 className="text-xl font-semibold">{data.house.inHouse}</h2>
              <p>In House</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">{data.house.departures}</h2>
              <p>Departures</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">{data.house.dirtyRooms}</h2>
              <p>Dirty Rooms</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">{data.house.readyRooms}</h2>
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
                {data.bookings.arrivals}
              </h2>
              <p>Arrivals</p>
            </a>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                {data.bookings.noShowLateCancel}
              </h2>
              <p>No Show/Late Cancel</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">{data.bookings.groups}</h2>
              <p>Groups</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                {data.bookings.todayBooked}
              </h2>
              <p>Today Booked</p>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Availability">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                {data.availability.totalRooms}
              </h2>
              <p>Total Rooms</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                {data.availability.sold}
              </h2>
              <p>Sold</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                {data.availability.available}
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
