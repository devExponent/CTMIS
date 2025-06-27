import React from "react";
import { Link } from "react-router-dom";
import MyImage from "../assets/img/image2.png";
import Image7 from "../assets/img/image7.avif";
import Image8 from "../assets/img/Image8.avif";
import Image6 from "../assets/img/image6.avif";
import Image2 from "../assets/img/image2.png";
import Image9 from "../assets/img/image9.avif";
import Image4 from "../assets/img/image4.avif";

const images = [Image7, Image6, Image8, Image2, Image9, Image4];

const Home = () => {
  return (
    <section>
      <section className="bg-gray-100">
        <div className="container mx-auto w-full md:w-8/12 lg:w-10/12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
            <div className=" text-black flex flex-col justify-center">
              <h1 className="font-bold text-[2rem] mt-6 md:mt-0 md:text-[3rem]">
                Optimize Your Transportation Operations with CTMIS
              </h1>
              <p className="text-justify">
                In today's fast-paced transportation landscape, efficient
                management of passenger services is crucial for operators to
                maintain a competitive edge. The Computerized Transport
                Management Information System (CTMIS) offers a comprehensive
                solution to streamline operations, reduce costs, and enhance
                overall service quality.
              </p>
              <button className="md:w-[15rem] md:mx-auto lg:mx-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300 mt-5">
                <Link to="/booking">Book a Ride Today</Link>
              </button>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex justify-center rounded-2xl text-black mx-20">
                <img src={MyImage} alt="Description" className="rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 mb-8">
        <div className="container mx-auto px-4 w-full md:w-8/12 lg:w-10/12 text-justify">
          <p className="text-lg text-justify">
            Welcome to the Computerized Transport Management Information System
            (CTMIS), your all-encompassing solution for modernizing
            transportation operations. Our platform offers real-time tracking,
            intelligent route optimization, and seamless integration, empowering
            your business to achieve unparalleled efficiency and cost savings.
            With CTMIS, you can monitor your fleet's performance, ensure timely
            deliveries, and provide superior customer satisfaction. Our system
            supports various sharing services with tools for seamless operations
            and exceptional user experiences. Experience the future of
            transportation management with CTMIS, where innovation drives
            success.
          </p>
        </div>
      </section>

      <section className="mb-5 md:mb-28">
        <h1 className="font-bold text-[2rem] mt-6 md:mt-0 md:text-[3rem] text-center my-5">
          Our Products
        </h1>
        <div className="container mx-auto w-full md:w-8/12 lg:w-10/12 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            <div className="bg-gray-100 shadow-md rounded-lg p-6 h-[20rem]">
              <h2 className="text-lg font-bold mb-4">Book a Ride</h2>
              <p className="text-gray-600 mb-2">
                Easily book a ride for your daily commute. Choose from bikes,
                cars, or scooters. Offline car rentals can seamelessly evolove
                with digital platform like CTMIS to enable and deliver a modern,
                hassle-free customer experience.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Learn More
              </button>
            </div>
            <div className="bg-gray-100 shadow-md rounded-lg p-6 h-[20rem]">
              <h2 className="text-lg font-bold mb-4">Rent Car</h2>
              <p className="text-gray-600 mb-2">
                Rent a car with seamless automation—from ID verification to
                keyless access. We provides a seamless and user-friendly
                solution for individuals and businesses looking to book vehicles
                on demand. Whether you need a car for daily commuting, business
                trips, or special occasions, this feature ensures convenience,
                flexibility, and affordability.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Learn More
              </button>
            </div>
            <div className="bg-gray-100 hadow-md rounded-lg p-6 h-[20rem]">
              <h2 className="text-lg font-bold mb-4">Lost and Found</h2>
              <p className="text-gray-600 mb-2">
                Report and recover lost items with our dedicated lost and found
                service. We to help users quickly report, track, and recover
                lost items. Whether you misplaced your belongings in a rented
                vehicle or found an item left behind, this feature ensures a
                seamless way to reconnect owners with their lost items.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="container mx-auto w-full md:w-8/12 lg:w-6/12 px-4">
          <div className="flex flex-col items-center py-10 bg-white overflow-hidden">
            <h1 className="font-bold text-[2rem] mt-6 md:mt-0 md:text-[3rem] text-center my-5">
              Flexible Fleet Options
            </h1>
            <p className="text-gray-600 text-center my-4 max-w-lg">
              Our platform supports various fleets including buses, cars,
              motorcycles, bicycles, and trucks.
            </p>

            {/* Scrolling Container */}
            <div className="relative w-full mt-6 overflow-hidden">
              <div className="flex space-x-6 animate-marquee">
                <div className="relative w-full overflow-hidden">
                  <div className="flex space-x-6 animate-marquee">
                    {images.map((src, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 rounded-xl shadow-sm flex-shrink-0 w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 flex items-center justify-center bg-white"
                      >
                        <img
                          src={src}
                          className="w-full h-full object-contain"
                          alt="Vehicle"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
