import { useEffect, useState } from "react";
import { FaUser, FaCarSide, FaMapMarkerAlt, FaTrashAlt } from "react-icons/fa";
import api from "../api";

const Rides = () => {
  const [rides, setRides] = useState([]);

  const statusColors = {
    pending: {
      bg: "bg-yellow-100 text-yellow-800",
      border: "border-l-4 border-yellow-400",
    },
    accepted: {
      bg: "bg-blue-100 text-blue-800",
      border: "border-l-4 border-blue-400",
    },
    ongoing: {
      bg: "bg-indigo-100 text-indigo-800",
      border: "border-l-4 border-indigo-400",
    },
    completed: {
      bg: "bg-green-100 text-green-800",
      border: "border-l-4 border-green-500",
    },
    cancelled: {
      bg: "bg-red-100 text-red-800",
      border: "border-l-4 border-red-500",
    },
  };

  const fetchRides = async () => {
    try {
      const res = await api.get("/rides");
      setRides(res.data.rides);
    } catch (err) {
      console.error("Rides fetch error:", err);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const deleteRide = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ride?")) return;
    try {
      await api.delete(`/rides/${id}`);
      fetchRides();
    } catch (err) {
      console.error("Delete ride error:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/rides/${id}/status`, { status });
      fetchRides();
    } catch (err) {
      console.error("Update ride status error:", err);
    }
  };

  return (
    <div className="p-8">
      <h1
        className="text-4xl font-extrabold mb-8 bg-clip-text text-transparent
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        drop-shadow-lg"
      >
        Rides
      </h1>

      <div className="overflow-x-auto">
        <div className="min-w-[900px] flex flex-col gap-4">
          {/* Header */}
          <div className="hidden sm:grid grid-cols-6 bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg">
            <div>User</div>
            <div>Captain</div>
            <div>Pickup</div>
            <div>Destination</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {/* Rows */}
          {rides.map((ride) => {
            const statusStyle = statusColors[ride.status] || {
              bg: "bg-gray-100 text-gray-700",
              border: "border-l-4 border-gray-300",
            };

            return (
              <div
                key={ride._id}
                className={`bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow
                            grid sm:grid-cols-6 gap-4 sm:items-center ${statusStyle.border}`}
              >
                {/* User */}
                <div className="flex items-center gap-3">
                  <FaUser className="text-gray-600 text-2xl" />
                  <div>
                    <p className="font-semibold text-base">
                      {ride.user?.fullname.firstname || "-"}{" "}
                      {ride.user?.fullname.lastname || ""}
                    </p>
                    <p className="text-gray-400 text-xs sm:hidden">User</p>
                  </div>
                </div>

                {/* Captain */}
                <div className="flex items-center gap-3">
                  <FaCarSide className="text-gray-600 text-2xl" />
                  <div>
                    <p className="font-semibold text-base">
                      {ride.captain?.fullname.firstname || "-"}{" "}
                      {ride.captain?.fullname.lastname || ""}
                    </p>
                    <p className="text-gray-400 text-xs sm:hidden">Captain</p>
                  </div>
                </div>

                {/* Pickup */}
                <div className="flex items-start gap-3 text-gray-700">
                  <FaMapMarkerAlt className="text-green-500 text-2xl mt-1" />
                  <div className="flex flex-col">
                    <span className="text-sm sm:text-base break-words whitespace-normal leading-snug">
                      {ride.pickup}
                    </span>
                    <p className="text-gray-400 text-xs sm:hidden mt-1">
                      Pickup
                    </p>
                  </div>
                </div>

                {/* Destination */}
                <div className="flex items-start gap-3 text-gray-700">
                  <FaMapMarkerAlt className="text-red-500 text-2xl mt-1" />
                  <div className="flex flex-col">
                    <span className="text-sm sm:text-base break-words whitespace-normal leading-snug">
                      {ride.destination}
                    </span>
                    <p className="text-gray-400 text-xs sm:hidden mt-1">
                      Destination
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-col">
                  <select
                    value={ride.status}
                    onChange={(e) => updateStatus(ride._id, e.target.value)}
                    className={`border px-3 py-1.5 rounded font-medium ${statusStyle.bg}`}
                  >
                    {Object.keys(statusColors).map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                  <p className="text-gray-400 text-xs sm:hidden mt-1">Status</p>
                </div>

                {/* Actions */}
                <div className="flex items-center sm:justify-center">
                  <button
                    onClick={() => deleteRide(ride._id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full text-lg"
                  >
                    <FaTrashAlt />
                  </button>
                  <p className="text-gray-400 text-xs sm:hidden ml-2">Action</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Rides;
