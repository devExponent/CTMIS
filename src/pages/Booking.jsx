import React, { useState, useEffect } from "react";
import { auth, db } from "../components/firebase";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const BookRide = () => {
  const navigate = useNavigate();

  const [pickup, setPickup] = useState("Crescent University");
  const [destination, setDestination] = useState("Shagamu");
  const [rideType, setRideType] = useState("standard");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bus, setBus] = useState("");
  const [driver, setDriver] = useState("");
  const [payment, setPayment] = useState("cash");

  const allTimeSlots = ["08:00", "09:30", "11:00", "13:00", "15:00"];
  const buses = [
    "Toyota Hiace - BUS-001",
    "Coaster Bus - BUS-002",
    "Sienna - BUS-003",
    "Toyota Hiace - BUS-004",
    "Coaster Bus - BUS-006",
    "Sienna - BUS-008",
    "Toyota Hiace - BUS-009",
    "Coaster Bus - BUS-014",
    "Sienna - BUS-07",
    "Toyota Hiace - BUS-011",
    "Coaster Bus - BUS-012",
    "Sienna - BUS-013",
  ];
  const drivers = ["Mr. Adebayo", "Ms. Chiamaka", "Mr. Idris"];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const shuffledTimes = [...allTimeSlots].sort(() => 0.5 - Math.random());
    const randomTimeSlots = shuffledTimes.slice(0, 3);
    setAvailableTimes(randomTimeSlots);
    setTime("");
    setBus("");
    setDriver("");
  }, [pickup, destination]);

  useEffect(() => {
    if (pickup && destination && time && rideType) {
      const randomBus = buses[Math.floor(Math.random() * buses.length)];
      const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
      setBus(randomBus);
      setDriver(randomDriver);

      let min = 0,
        max = 0;
      if (rideType === "economy") {
        min = 20000;
        max = 40000;
      } else if (rideType === "luxury") {
        min = 30000;
        max = 80000;
      } else {
        min = 10000;
        max = 30000;
      }
      const randomPrice = Math.floor(Math.random() * (max - min + 1)) + min;
      setPrice(`₦${randomPrice}`);
    } else {
      setBus("");
      setDriver("");
      setPrice("");
    }
  }, [pickup, destination, time, rideType]);

  const handleBooking = async () => {
    if (!auth.currentUser) {
      alert("Please log in to book a ride.");
      return;
    }

    if (date && availableTimes && bus && driver) {
      try {
        const user = auth.currentUser;
        const bookingRef = collection(db, "Users", user.uid, "bookings");

        await addDoc(bookingRef, {
          pickup,
          destination,
          rideType,
          date,
          time,
          price,
          bus,
          driver,
          payment,
          createdAt: new Date(),
        });

        toast.success("Ride booked successfully!", {
          position: "top-right",
        });

        setTimeout(() => {
          navigate("/user");
        }, 1500);
      } catch (error) {
        console.error("Booking error:", error);
        toast.error("Failed to confirm booking. Please try again.");
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <>
      <section className="bg-cover bg-center my-20 bg-gray-100 py-8 h-screen grid place-items-center">
        <div className="container mx-auto w-full md:w-8/12 lg:w-10/12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="my-auto mx-auto">
              <h1 className="font-bold text-[2rem] mt-6 md:mt-0 md:text-[3rem] my-5">
                The modern way to commute across cities
              </h1>
              <p className="text-justify">
                CTMIS is your smart companion for seamless intercity travel.
                Whether you're planning a quick getaway or a routine trip, our
                app provides you with reliable transport services, real-time
                schedules, and stress-free bookings—all in one place. Say
                goodbye to long queues and uncertainty. CTMIS makes commuting
                smarter, faster, and more convenient.
              </p>
            </div>
            <div className="">
              <div className="container mx-auto p-6">
                <h2 className="font-bold text-center text-3xl mb-6">
                  Book a Ride
                </h2>
                <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                  <label className="block mb-2">
                    Pickup Location within Abeokuta:
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                  >
                    <option value="crescent university">
                      Crescent University
                    </option>
                    <option value="Kuto">Kuto</option>
                    <option value="Ashero">Ashero</option>
                    <option value="Lafenwa">Lafenwa</option>
                  </select>

                  <label className="block mb-2">
                    Destination:<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                  >
                    <option value="shagamu">Shagamu</option>
                    <option value="ibadan">Ibadan</option>
                    <option value="ijebu">Ijebu</option>
                    <option value="oyo">Oyo</option>
                    <option value="mowe">Mowe</option>
                    <option value="lagos">Lagos</option>
                    <option value="ogbomosho">Ogbomosho</option>
                    <option value="ilorin">Ilorin</option>
                  </select>

                  <label className="block mb-2">
                    Ride Type:<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={rideType}
                    onChange={(e) => setRideType(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                  >
                    <option value="standard">Standard</option>
                    <option value="economy">Economy</option>
                    <option value="luxury">Luxury</option>
                  </select>

                  <label className="block mb-2">
                    Date<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                  />

                  <label className="block mb-2">
                    Available Time Slots:<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                  >
                    <option value="">-- Select Time --</option>
                    {availableTimes.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>

                  {bus && driver && (
                    <>
                      <label className="block mb-2">Assigned Bus:</label>
                      <input
                        type="text"
                        value={bus}
                        readOnly
                        className="w-full border p-2 rounded mb-4 bg-gray-100"
                      />

                      <label className="block mb-2">Driver:</label>
                      <input
                        type="text"
                        value={driver}
                        readOnly
                        className="w-full border p-2 rounded mb-4 bg-gray-100"
                      />

                      <label className="block mb-2">Estimated Fare:</label>
                      <input
                        type="text"
                        value={price}
                        readOnly
                        className="w-full border p-2 rounded mb-4 bg-gray-100 text-green-700 font-semibold"
                      />
                    </>
                  )}

                  <label className="block mb-2">
                    Payment Method<span className="text-red-500">*</span>:
                  </label>
                  <select
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                  >
                    <option value="cash">Cash</option>
                    <option value="wallet">Bank Transfer</option>
                  </select>

                  <button
                    onClick={handleBooking}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookRide;
