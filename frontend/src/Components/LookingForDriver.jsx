
import React from 'react';

const LookingForDriver = (props) => {

  const vehicleImages = {
   car: "/public/car.png",
  motorcycle: "/public/bike.jpeg",
  auto: "/public/auto.png",
};

  return (
    <div className="relative text-center p-4">
      <button
        className="p-1 absolute w-[93%] top-0"
        onClick={() => props.setVehicleFound(false)}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </button>

      <h1 className="text-2xl font-semibold mt-10 mb-2">Looking For Driver</h1>
      <p className="text-gray-500 text-sm mb-6">Searching for a nearby driver...</p>
      <div className="flex justify-center items-center mb-5">
        <div className="w-12 h-12 border-4 border-dashed border-green-500 rounded-full animate-spin"></div>
      </div>

      <div className="flex gap-2 justify-between items-center flex-col">
        <img
          className="h-20"
          src={vehicleImages[props.vehicleType]} 
          alt={props.vehicleType}
        />

        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill text-green-500"></i>
            <div>
              <p className="text-sm -mt-1 text-gray-600">
                {props.pickup}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill text-red-500"></i>
            <div>
              <p className="text-sm -mt-1 text-gray-600">
                {props.destination}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-currency-line text-yellow-500"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
