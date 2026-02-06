import React from 'react';


const VehiclePanel = ({ fare, setVehiclePanel, setConfirmRidePanel ,selectVehicle }) => {
  return (
    <div className='rounded-t-xl '>
      <div className='relative  text-center'>
        <button
          className='p-1 absolute w-[93%] top-0 text-3xl text-gray-200'
          onClick={() => setVehiclePanel(false)}
        >
          <i className='ri-arrow-down-wide-line'></i>
        </button>
        <h1 className='text-2xl font-semibold mb-6 pt-10'>Choose a vehicle</h1>
      </div>
      <div
        onClick={() => {
          setConfirmRidePanel(true)
          selectVehicle("car")
        }}
        className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'
      >
        <img
          className='h-10'
          src='/public/car.png'
          alt='UberGo'
        />
        <div className='ml-2 w-1/2'>
          <h4 className='font-medium text-base'>
            RideGo <span><i className='ri-user-3-fill text-blue-500'></i> 4</span>
          </h4>
          <p className='font-medium text-sm'>2 mins away</p>
          <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
        </div>
        <p className='text-lg font-semibold text-green-500'>₹{fare?.car ?? '--'}</p>
      </div>
      <div
        onClick={() => {
          setConfirmRidePanel(true)
          selectVehicle("motorcycle")
        }}
        className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'
      >
        <img
          className='h-10'
          src='/public/bike.jpeg'
          alt='Moto'
        />
        <div className='ml-2 w-1/2'>
          <h4 className='font-medium text-base'>
            Moto <span><i className='ri-user-3-fill text-blue-500'></i> 1</span>
          </h4>
          <p className='font-medium text-sm'>3 mins away</p>
          <p className='font-normal text-xs text-gray-600'>Affordable, Motorcycle rides</p>
        </div>
        <p className='text-lg font-semibold text-green-500'>₹{fare?.motorcycle ?? '--'}</p>
      </div>
      <div
        onClick={() => {
          setConfirmRidePanel(true)
          selectVehicle("auto")
        }}
        className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'
      >
        <img
          className='h-10'
          src='/public/auto.png'
          alt='UberAuto'
        />
        <div className='ml-2 w-1/2'>
          <h4 className='font-medium text-base '>
            RideAuto <span><i className='ri-user-3-fill  text-blue-500'> </i>3 </span>
          </h4>
          <p className='font-medium text-sm'>2 mins away</p>
          <p className='font-normal text-xs text-gray-600'>Affordable, Auto rides</p>
        </div>
        <p className='text-lg font-semibold text-green-600'>₹{fare?.auto ?? '--'}</p>
      </div>
    </div>
  );
};

export default VehiclePanel; 