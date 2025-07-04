import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-black text-white text-xl p-4 shadow-md py-5">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold">
          CTMIS
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 ">
          <Link to="/" className="hover:text-gray-500">
            Home
          </Link>
          <Link to="/booking" className="hover:text-gray-500">
            Book Ride
          </Link>
          <Link to="/rent-car" className="hover:text-gray-500">
            Rent Car
          </Link>
          <Link to="/lostfound" className="hover:text-gray-500">
            Lost & Found
          </Link>
          <Link to="/faqs" className="hover:text-gray-500">
            Faqs
          </Link>

          <Link to="/user" className="hover:text-gray-500">
            Dashboard
          </Link>
        </div>

        {/* Login Button */}
        <Link
          to="/login"
          className="hidden md:block bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-500"
        >
          Login
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 text-center bg-white text-black p-4 rounded-lg">
          <Link
            to="/"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/booking"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Book Ride
          </Link>
          <Link
            to="/rent-car"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Rent Car
          </Link>
          <Link
            to="/lostfound"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Lost & Found
          </Link>
          <Link
            to="/faqs"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Faqs
          </Link>
          {/* <Link
            to="/admin"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Admin Panel
          </Link> */}
          <Link
            to="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
