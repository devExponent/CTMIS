import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

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

  const drivers = [
    "Mr. Adebayo",
    "Ms. Chiamaka",
    "Mr. Idris",
    "Musa Aminu",
    "Adeiza",
  ];
  const timeSlots = ["08:00", "09:30", "11:00", "13:00", "15:00"];
  const rideTypes = ["Standard", "Economy", "Luxury"];
  const paymentMethods = ["Cash", "Bank Transfer"];

  const [adminNotes, setAdminNotes] = useState("");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">CTMIS Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Buses" count={buses.length} />
        <StatCard label="Total Drivers" count={drivers.length} />
        <StatCard label="Ride Types Available" count={rideTypes.length} />
        <StatCard label="Daily Time Slots" count={timeSlots.length} />
      </div>

      {/* Buses */}
      <Section title="Available Buses">
        <ul className="list-disc pl-6">
          {buses.map((bus, i) => (
            <li key={i}>{bus}</li>
          ))}
        </ul>
      </Section>

      {/* Drivers */}
      <Section title="Registered Drivers">
        <ul className="list-disc pl-6">
          {drivers.map((driver, i) => (
            <li key={i}>{driver}</li>
          ))}
        </ul>
      </Section>

      {/* Booking Info */}
      <Section title="Booking Options & Settings">
        <p>
          <strong>Time Slots:</strong> {timeSlots.join(", ")}
        </p>
        <p>
          <strong>Ride Types:</strong> {rideTypes.join(", ")}
        </p>
        <p>
          <strong>Payment Methods:</strong> {paymentMethods.join(", ")}
        </p>
      </Section>

      {/* Admin Notes */}
      <Section title="Admin Notes">
        <textarea
          rows={5}
          className="w-full p-3 border rounded shadow-sm"
          placeholder="Write admin notes, system reminders, or messages here..."
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
        />
      </Section>

      {/* Quick Actions */}
      <Section title="Quick Actions">
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => navigate("/book")}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            Go to Booking Page
          </button>
        </div>
      </Section>
    </div>
  );
};

const StatCard = ({ label, count }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center">
    <p className="text-gray-600 font-medium">{label}</p>
    <p className="text-3xl font-bold text-blue-600 mt-2">{count}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-semibold mb-3">{title}</h2>
    <div className="bg-white p-4 rounded-xl shadow">{children}</div>
  </div>
);

export default AdminDashboard;
