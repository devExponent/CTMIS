import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 text-xl">
      <div className="container mx-auto text-center space-y-4">
        {/* Quick Links */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center space-y-2 sm:space-y-0 sm:space-x-6">
          <Link to="/" className="hover:text-blue-500 sm:w-auto w-full">
            Home
          </Link>
          <Link to="/booking" className="hover:text-blue-500 sm:w-auto w-full">
            Book Ride
          </Link>
          <Link to="/rent-car" className="hover:text-blue-500 sm:w-auto w-full">
            Rent a Car
          </Link>
          <Link
            to="/lost-found"
            className="hover:text-blue-500 sm:w-auto w-full"
          >
            Lost & Found
          </Link>
          <Link to="/faqs" className="hover:text-blue-500 sm:w-auto w-full">
            Faqs
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <Twitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <Instagram size={24} />
          </a>
        </div>

        {/* Contact Information */}
        <div>
          <p>
            Email:{" "}
            <a href="mailto:support@ctmis.com" className="hover:text-blue-500">
              support@ctmis.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+1234567890" className="hover:text-blue-500">
              +234 816 735 7479
            </a>
          </p>
        </div>

        {/* Copyright */}
        <div>
          <p>© 2025 CTMIS. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
