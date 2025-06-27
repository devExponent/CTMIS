// src/routes.js
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Booking from "../pages/Booking";
import Home from "../pages/Home";
import Faqs from "../pages/Faqs";
import LostFound from "../pages/LostButFound";
import NotFound from "../pages/NotFound";
import RentCar from "../pages/RentCar";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Login from "../auth/Login";
import Admin from "../pages/Dashboard/Admin";
import User from "../pages/Dashboard/Profile";
import Signup from "../auth/Signup";

import { ToastContainer } from "react-toastify";
import { auth } from "../components/firebase";

export default function AppRoutes() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (loadingAuth) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/booking"
          element={user ? <Booking /> : <Navigate to="/login" />}
        />
        <Route path="/rent-car" element={<RentCar />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/lostfound" element={<LostFound />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/user" /> : <Login />}
        />
        <Route
          path="/user"
          element={user ? <User /> : <Navigate to="/login" />}
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </Router>
  );
}
