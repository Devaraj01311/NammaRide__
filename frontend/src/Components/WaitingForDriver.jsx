import React, { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContex";

const WaitingForDriver = (props) => {
  const { socket } = useContext(SocketContext);

  const vehicleImages = {
     car: "/public/car.png",
  motorcycle: "/public/bike.jpeg",
  auto: "/public/auto.png",
  };

  useEffect(() => {
    // Listen for ride cancelled event
    socket.on("ride-cancelled-by-captain", (data) => {
      console.log("Ride cancelled by captain:", data);
      props.setWaitingForDriver(false); 
      props.setVehicleFound(true);
    });

    return () => socket.off("ride-cancelled-by-captain");
  }, [socket]);

  const vehicleType = props.ride?.captain?.vehicle?.vehicleType || "car";

  return (
    <div className="relative text-center p-5 bg-white rounded-2xl max-w-md mx-auto mt-4">
      {/* Close Button */}
      <button
        className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 transition-all"
        onClick={() => props.setWaitingForDriver(false)}
      >
         <i className="text-3xl ri-arrow-down-wide-line"></i>
      </button>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-5">Waiting for Driver</h2>

      {/* Driver Info */}
      <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 shadow-sm mb-5">
        <img
          className="h-20 w-20 rounded-lg object-cover border border-gray-200"
          src={vehicleImages[vehicleType]}
          alt={vehicleType}
        />

        <div className="text-right w-2/3">
          <h2 className="text-lg font-semibold text-gray-800 capitalize">
            {props.ride?.captain?.fullname?.firstname}{" "}
            {props.ride?.captain?.fullname?.lastname}
          </h2>

          <h3 className="text-xl font-bold text-gray-700 mt-1">
            {props.ride?.captain?.vehicle?.plate || "N/A"}
          </h3>

          <p className="text-md text-gray-600 font-medium">
            {props.ride?.captain?.vehicle?.vehicleType || "Vehicle"} –{" "}
            {props.ride?.captain?.vehicle?.color || "Color"}
          </p>

          <p className="text-md font-semibold text-indigo-600 mt-1">
            OTP: {props.ride?.otp || "----"}
          </p>
        </div>
      </div>

      {/* Ride Info */}
      <div className="flex flex-col gap-3 w-full">
        <div className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg bg-gray-50">
          <i className="ri-map-pin-2-fill text-blue-500 text-xl"></i>
          <p className="text-sm text-gray-700">{props.ride?.pickup}</p>
        </div>

        <div className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg bg-gray-50">
          <i className="ri-map-pin-user-fill text-red-500 text-xl"></i>
          <p className="text-sm text-gray-700">{props.ride?.destination}</p>
        </div>

        <div className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg bg-gray-50">
          <i className="ri-currency-line text-yellow-500 text-xl"></i>
          <div>
            <h4 className="text-lg font-semibold text-gray-800">
              ₹{props.ride?.fare || 0}
            </h4>
            <p className="text-sm text-gray-600">Cash</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
