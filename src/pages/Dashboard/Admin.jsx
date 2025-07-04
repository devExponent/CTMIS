// src/pages/Dashboard/AdminDashboard.jsx

import React, { useEffect, useState } from "react";
import { auth, db } from "../../components/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await getDocs(collection(db, "Bookings"));
      setBookings(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "Users"));
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchBookings();
    fetchUsers();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user || user.email !== "admin@example.com") {
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <ul>
          <li className="mb-4 cursor-pointer">View Bookings</li>
          <li className="mb-4 cursor-pointer">View Users</li>
          <li className="mb-4 cursor-pointer" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10 bg-gray-100">
        <h2 className="text-3xl font-bold mb-6">Bookings</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Pickup</th>
              <th className="border p-2">Destination</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="border p-2">{booking.pickup}</td>
                <td className="border p-2">{booking.destination}</td>
                <td className="border p-2">{booking.date}</td>
                <td className="border p-2">{booking.time}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-3xl font-bold mb-6 mt-10">Users</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">First Name</th>
              <th className="border p-2">Last Name</th>
              <th className="border p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border p-2">{user.Firstname}</td>
                <td className="border p-2">{user.Lastname}</td>
                <td className="border p-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminDashboard;
