
import React from 'react';

const ConfirmRide = (props) => {
const vehicleImages = {
  car: "/public/car.png",
  motorcycle: "/public/bike.jpeg",
  auto: "/public/auto.png",
};


  return (
    <div>
      <div className="relative text-center">
        <button
          className="p-1 absolute w-[93%] top-0"
          onClick={() => props.setConfirmRidePanel(false)}
        >
          <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </button>
        <h1 className="text-2xl font-semibold mb-5 pt-10">Confirm your Ride</h1>
      </div>
      <div className="flex gap-2 justify-between items-center flex-col">
        <img
          className="h-20"
          src={vehicleImages[props.vehicleType]} 
          alt={props.vehicleType}
        />
        <div className="w-full mt-5 ">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill text-green-500"></i>
            <div>
              <h3 className="text-lg font-semibold">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.pickup}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill text-red-500"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.destination}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-currency-line text-yellow-500"></i>
            <div>
              <h3 className="text-lg font-medium ">
                ₹{props.fare[props.vehicleType]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
            props.createRide();
          }}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
