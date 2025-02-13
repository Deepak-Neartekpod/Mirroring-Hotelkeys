import { Button } from "@/components/ui-elements/button";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import data from "@/data/data";

const Dashboard = () => {
  console.log("jfsdkcxf", data);

  return (
    <div className="bg-gray-100 p-6 dark:bg-gray-900">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ShowcaseSection title="House">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">{data[0].house.inHouse}</h2>
              <p>In House</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                {data[0].house.departures}
              </h2>
              <p>Departures</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                {data[0].house.dirtyRooms}
              </h2>
              <p>Dirty Rooms</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                {data[0].house.readyRooms}
              </h2>
              <p>Ready Rooms</p>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Bookings">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                {data[0].bookings.arrivals}
              </h2>
              <p>Arrivals</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                {data[0].bookings.noShowLateCancel}
              </h2>
              <p>No Show/Late Cancel</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                {data[0].bookings.groups}
              </h2>
              <p>Groups</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                {data[0].bookings.todayBooked}
              </h2>
              <p>Today Booked</p>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Availability">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                {data[0].availability.totalRooms}
              </h2>
              <p>Total Rooms</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                {data[0].availability.sold}
              </h2>
              <p>Sold</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                {data[0].availability.available}
              </h2>
              <p>Available</p>
            </div>
          </div>
        </ShowcaseSection>
      </div>
      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        <Button
          label="Walk-In"
          className="rounded-lg border-2 border-primary bg-primary px-4 py-2 text-white hover:bg-opacity-80"
        />
        <Button
          label="New Booking"
          className="rounded-lg border-2 border-primary bg-primary px-4 py-2 text-white hover:bg-opacity-80"
        />
        <Button
          label="End Shift"
          className="rounded-lg border-2 border-primary bg-primary px-4 py-2 text-white hover:bg-opacity-80"
        />
        <Button
          label="Search Reservation"
          className="rounded-lg border-2 border-primary bg-primary px-4 py-2 text-white hover:bg-opacity-80"
        />
        <Button
          label="Group Master"
          className="rounded-lg border-2 border-primary bg-primary px-4 py-2 text-white hover:bg-opacity-80"
        />
        <Button
          label="Grid View & Floor Plan"
          className="rounded-lg border-2 border-primary bg-primary px-4 py-2 text-white hover:bg-opacity-80"
        />
      </div>
    </div>
  );
};

export default Dashboard;
