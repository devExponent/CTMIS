import React, { useState, useEffect } from "react";
import { auth, db } from "../../components/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          }

          const bookingsRef = collection(db, "Users", user.uid, "bookings");
          const bookingsSnap = await getDocs(bookingsRef);
          const allBookings = bookingsSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBookings(allBookings);
        } catch (error) {
          console.log("Error fetching data:", error.message);
        }
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("User logged out Successfully", {
        position: "top-right",
      });
      navigate("/login");
    } catch (error) {
      console.log("Error logging out: ", error.message);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await deleteDoc(doc(db, "Users", user.uid, "bookings", bookingId));
      setBookings(bookings.filter((b) => b.id !== bookingId));
      toast.success("Booking cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel booking");
      console.log("error message: ", error.message);
    }
  };

  return (
    <>
      <div className="p-6 my-8">
        {userDetails ? (
          <div className="bg-white shadow-2xl rounded-lg p-8 w-full">
            <h1 className="text-[4rem] font-bold mb-4 text-center">
              WELCOME {userDetails.Firstname}
            </h1>
            <p className="text-center">
              <b>
                You can easily manage your bookings here. Do well to contact us
                via our contact form should you face any challenges. Thank you!
              </b>
            </p>
            <div className="text-xl">
              <h>Email: {userDetails.email}</h>
              <p>First Name: {userDetails.Firstname}</p>
              <p>Last Name: {userDetails.Lastname}</p>
              <p>Phone Number: {userDetails.PhoneNumber}</p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 px-6 py-2 bg-gray-600 text-white rounded hover:bg-blue-700"
            >
              Logout
            </button>

            <button
              onClick={() => navigate("/booking")}
              className="mt-4 ml-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Book a Ride
            </button>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Your Bookings:</h2>
              {bookings.length === 0 ? (
                <p>No bookings found.</p>
              ) : (
                bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border p-4 rounded mb-4 bg-gray-100"
                  >
                    <p>
                      <strong>From:</strong> {booking.pickup}
                    </p>
                    <p>
                      <strong>To:</strong> {booking.destination}
                    </p>
                    <p>
                      <strong>Date:</strong> {booking.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {booking.time}
                    </p>
                    <p>
                      <strong>Fare:</strong> {booking.price}
                    </p>
                    <p>
                      <strong>Bus:</strong> {booking.bus}
                    </p>
                    <p>
                      <strong>Driver:</strong> {booking.driver}
                    </p>

                    <div className="overflow-hidden text-red-600 py-2 w-full  flex justify-center mt-6">
                      <p className="animate-marquee text-xl whitespace-nowrap w-1/2 ">
                        <strong>
                          Payment yet received. Ensure to come with your money
                          on the pickup date.
                        </strong>
                      </p>
                    </div>
                    <button
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <h1>Loading user profile...</h1>
        )}
      </div>
    </>
  );
};

export default Profile;
