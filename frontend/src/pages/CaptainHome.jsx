// src/pages/Home.jsx
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CaptainDetails from '../Components/CaptainDetails';
import RidePopUp from '../Components/RidePopUp';
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CaptainDataContext } from '../context/CaptainContext';
import { SocketContext } from '../context/SocketContex';
import axios from 'axios';

gsap.registerPlugin(useGSAP);

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);
  const [profilePopup, setProfilePopup] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const profilePopupRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  // Join socket room and send location
  useEffect(() => {
    if (!captain?._id || !socket) return;

    socket.emit('join', { userId: captain._id, userType: 'captain' });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const locationData = {
          userId: captain._id,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        };
        console.log('Captain location:', locationData);
        socket.emit('update-location-captain', locationData);
      });

      const watchId = navigator.geolocation.watchPosition((position) => {
        const locationData = {
          userId: captain._id,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        };
        socket.emit('update-location-captain', locationData);
      });

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [captain?._id, socket]);

  // Listen for new rides
  useEffect(() => {
    if (!socket) return;

    const handleNewRide = (rideData) => {
      console.log('New ride received:', rideData);
      setRide(rideData);
      setRidePopupPanel(true);
    };

    socket.on('new-ride', handleNewRide);

    return () => socket.off('new-ride', handleNewRide);
  }, [socket]);

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  }

  // GSAP Animations
  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3,
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3,
    });
  }, [confirmRidePopupPanel]);

  useGSAP(() => {
    gsap.to(profilePopupRef.current, {
      transform: profilePopup ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3,
    });
  }, [profilePopup]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/captain-login');
  };

  // Hide header when any popup is open
  const hideHeader = ridePopupPanel || confirmRidePopupPanel || profilePopup;

  return (
    <div className="h-screen relative">

      {/* Header (hidden when any popup is open) */}
      {!hideHeader && (
        <div className="fixed p-2 top-0 flex items-center justify-between w-screen z-20">
          <img className="w-28" src="/image.png" alt="logo" />
          <button
            onClick={() => setProfilePopup(true)}
            className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md"
          >
            <i className="ri-account-circle-line text-2xl text-gray-700"></i>
          </button>
        </div>
      )}

      {/* Map Placeholder */}
      <div className="h-3/5">
        <img
          className="w-full h-full object-cover"
          src="https://th.bing.com/th/id/R.1db4a250b71916464241a4c83753c53a?rik=DrcerxiYJEVe%2bQ&riu=http%3a%2f%2fitsmybengaluru.com%2fwp-content%2fuploads%2f2023%2f10%2fgoogle-maps.png&ehk=HjzW72VKXRztjBI%2bv8cLGGUFoscY8HIHlicKMUOzlCQ%3d&risl=&pid=ImgRaw&r=0"
          alt="map"
        />
      </div>

      {/* Captain Details */}
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      {/* Ride Popup */}
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 px-3 py-10 pt-12 bg-white rounded-t-3xl translate-y-full"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* Confirm Ride Popup */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 px-3 py-10 pt-12 rounded-t-3xl bg-white translate-y-full"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>

      {/* Captain Profile Popup */}
      <div
        ref={profilePopupRef}
        className="fixed w-full bottom-0 bg-white rounded-t-3xl z-30 translate-y-full shadow-[0_-8px_30px_rgba(0,0,0,0.25)] px-6 py-10 text-center"
      >
        {/* Profile Header */}
        <div className="flex flex-col items-center space-y-3 mb-6">
          <img
            className="h-20 w-20 rounded-full object-cover ring-4 ring-blue-300 shadow-md"
            src="https://images.freeimages.com/images/premium/previews/1396/13965355-young-cheerful-indian-auto-rickshaw-driver.jpg"
            alt="Captain"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 capitalize">
              {captain?.fullname?.firstname} {captain?.fullname?.lastname}
            </h2>
            <p className="text-gray-500 text-sm">{captain?.email}</p>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-inner text-left space-y-2 mx-auto w-[90%] sm:w-[60%]">
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Vehicle:</span> {captain?.vehicle?.vehicleType || "N/A"}
          </p>
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Vehicle No:</span> {captain?.vehicle?.plate || "N/A"}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-3">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white font-semibold py-3 rounded-xl hover:bg-red-600 transition"
          >
            Logout
          </button>

          <button
            onClick={() => setProfilePopup(false)}
            className="text-blue-500 font-bold hover:text-blue-600 underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
