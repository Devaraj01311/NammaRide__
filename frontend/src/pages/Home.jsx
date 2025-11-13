// src/pages/Home.jsx
import React, { useRef, useState, useEffect, useContext } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../Components/LocationSearchPanel';
import VehiclePanel from '../Components/VehiclePanel';
import ConfirmRide from '../Components/ConfirmRide';
import LookingForDriver from '../Components/LookingForDriver';
import WaitingForDriver from '../Components/WaitingForDriver';
import { SocketContext } from '../context/SocketContex';
import { UserDataContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [profilePopup, setProfilePopup] = useState(false); // ✅ added

  const pickupRef = useRef(null);
  const profilePopupRef = useRef(null); // ✅ added

  const navigate = useNavigate();

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const vehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  // Join socket room
  useEffect(() => {
    if (user && user._id) {
      socket.emit("join", { userType: "user", userId: user._id });
    }
  }, [user, socket]);

  // Listen for ride confirmed
  useEffect(() => {
    if (!socket) return;

    const handleRideConfirmed = async (rideData) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/rides/${rideData._id}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        const fullRide = response.data;

        setVehicleFound(false);
        setWaitingForDriver(true);
        setRide(fullRide);
      } catch (err) {
        console.error("Error fetching ride details:", err);
      }
    };

    socket.on("ride-confirmed", handleRideConfirmed);

    return () => socket.off("ride-confirmed", handleRideConfirmed);
  }, [socket]);

  // Listen for ride started
  useEffect(() => {
    if (!socket) return;

    const handleRideStarted = async (rideData) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/rides/${rideData._id}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        const fullRide = response.data;

        setWaitingForDriver(false);
        navigate('/riding', { state: { ride: fullRide } });
      } catch (err) {
        console.error("Error fetching ride details:", err);
      }
    };

    socket.on("ride-started", handleRideStarted);

    return () => socket.off("ride-started", handleRideStarted);
  }, [socket, navigate]);

  // GSAP animation for profile popup
  useGSAP(() => {
    gsap.to(profilePopupRef.current, {
      y: profilePopup ? 0 : "100%",
      duration: 0.5,
      ease: "power3.out"
    });
  }, [profilePopup]);

  // Pickup & Destination input handlers
  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);

    if (value.trim().length < 3) {
      setPickupSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        { params: { input: value }, headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setPickupSuggestions(response.data || []);
    } catch (error) {
      console.error("Error fetching pickup suggestions:", error);
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);

    if (value.trim().length < 3) {
      setDestinationSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        { params: { input: value }, headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setDestinationSuggestions(response.data || []);
    } catch (error) {
      console.error("Error fetching destination suggestions:", error);
    }
  };

  const submitHandler = (e) => e.preventDefault();

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: '70%', opacity: 1 });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else {
      gsap.to(panelRef.current, { height: '0%', opacity: 0 });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanel ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [vehiclePanel]);

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      transform: confirmRidePanel ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [waitingForDriver]);

  // Fare calculation
  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setFare(response.data);
    } catch (err) {
      console.error("Error fetching fare:", err);
    }
  }

  // Create ride
  async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        { pickup, destination, vehicleType },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      console.log("Ride created:", response.data);
    } catch (err) {
      console.error("Error creating ride:", err);
    }
  }

  // Current location button
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);
    gsap.to(pickupRef.current, { opacity: 0.5, duration: 0.3 });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/maps/reverse-geocode`,
            {
              params: { lat: latitude, lng: longitude },
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
          );

          const address = response.data?.address || "Current location";

          gsap.fromTo(
            pickupRef.current,
            { backgroundColor: "#d1fae5" },
            {
              backgroundColor: "#eee",
              duration: 1.2,
              ease: "power2.out",
              onStart: () => setPickup(address),
            }
          );
        } catch (error) {
          console.error("Error getting address:", error);
          alert("Failed to fetch your current address.");
        } finally {
          gsap.to(pickupRef.current, { opacity: 1, duration: 0.3 });
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Location access denied:", error);
        alert("Unable to access location.");
        gsap.to(pickupRef.current, { opacity: 1, duration: 0.3 });
        setLoadingLocation(false);
      }
    );
  };

  return (
    <div className='h-screen relative'>
      {/* Header */}
     {/* Hide logo and icons when LocationSearch popup is open */}
{!panelOpen && (
  <div className='fixed p-2 top-0 flex items-center justify-between w-screen z-50'>
    <img className='w-28 top-0 left-2' src="/image.png" alt="logo" />

    <div className='flex gap-3 items-center'>
     

      <button
        onClick={() => setProfilePopup(true)}
        className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md hover:bg-gray-50 transition"
      >
        <i className="ri-account-circle-line text-2xl text-gray-700"></i>
      </button>
    </div>
  </div>
)}


      {/* Background map */}
      <div onClick={() => setVehiclePanel(false)} className='h-screen w-screen'>
        <img className='w-full h-full object-cover' src="https://th.bing.com/th/id/R.1db4a250b71916464241a4c83753c53a?rik=DrcerxiYJEVe%2bQ&riu=http%3a%2f%2fitsmybengaluru.com%2fwp-content%2fuploads%2f2023%2f10%2fgoogle-maps.png&ehk=HjzW72VKXRztjBI%2bv8cLGGUFoscY8HIHlicKMUOzlCQ%3d&risl=&pid=ImgRaw&r=0" alt="map"/>
      </div>

      {/* Form */}
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full '>
        <div className='h-[30%] p-5 rounded-t-3xl bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='absolute opacity-0 top-6 right-6 text-2xl'>
            <i className='ri-arrow-down-wide-line'></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={submitHandler}>
            <input className='line absolute h-16 w-1 top-[45%] left-9 bg-gray-700 rounded-full' />
            
            <input
              ref={pickupRef}
              onClick={() => { setPanelOpen(true); setActiveField('pickup'); }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
              type='text'
              placeholder='Add a pick-up location'
            />

            <input
              onClick={() => { setPanelOpen(true); setActiveField('destination'); }}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
              type='text'
              placeholder='Enter your destination'
            />

            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={loadingLocation}
              className='flex items-center gap-2 text-blue-600 text-sm font-medium mt-2'
            >
              <i className='ri-navigation-fill'></i>
              {loadingLocation ? "Fetching location..." : "Use Current Location"}
            </button>
          </form>

          <button onClick={findTrip} className='bg-black text-white font-semibold px-4 py-2 rounded-lg mt-3 w-full'>Find Trip</button>
        </div>

        {/* Suggestions Panel */}
        <div ref={panelRef} className='h-0 bg-white overflow-y-auto'>
          <LocationSearchPanel
            query={activeField === 'pickup' ? pickup : destination}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            pickupSuggestions={pickupSuggestions}
            destinationSuggestions={destinationSuggestions}
          />
        </div>
      </div>

      {/* Vehicle Selection */}
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-12 bg-white rounded-t-3xl'>
        <VehiclePanel selectVehicle={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>

      {/* Confirm Ride */}
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white rounded-t-3xl'>
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/* Looking for Driver */}
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white rounded-t-3xl'>
        <LookingForDriver
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>

      {/* Waiting for Driver */}
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white rounded-t-3xl'>
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
        />
      </div>

      {/* ✅ Profile Popup */}
      <div
        ref={profilePopupRef}
        className="fixed w-full bottom-0 bg-white rounded-t-3xl z-[10000] translate-y-full shadow-[0_-5px_25px_rgba(0,0,0,0.2)] px-6 py-8 text-center"
      >
        <button
          onClick={() => setProfilePopup(false)}
          className="absolute top-4 right-6 text-2xl text-gray-500 hover:text-gray-800"
        >
          <i className="ri-close-line"></i>
        </button>

        <div className="flex flex-col items-center space-y-3 mt-5">
          <img
            className="h-14 w-14 rounded-full object-cover border-2 border-green-500"
            src={user?.avatar || "https://th.bing.com/th/id/OIP.jSFa5zJREQf6N6zOSAEOfgHaE8?w=249&h=180&c=7&r=0&o=5&pid=1.7"}
            alt="User"
          />
          <h2 className="text-lg font-semibold text-gray-800">
            {user?.fullname?.firstname} {user?.fullname?.lastname}
          </h2>
          <p className="text-gray-500 text-sm">{user?.email || "N/A"}</p>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate('/login');
            }}
            className="mt-4 w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
