import { useEffect, useState } from "react";
import { FaTrashAlt, FaCarSide, FaRupeeSign, FaMapMarkerAlt } from "react-icons/fa";
import api from "../api";

const Captains = () => {
  const [captains, setCaptains] = useState([]);

  const fetchCaptains = async () => {
    try {
      const res = await api.get("/captains");
      setCaptains(res.data.captains);
    } catch (err) {
      console.error("Captains fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCaptains();
  }, []);

  const deleteCaptain = async (id) => {
    if (!window.confirm("Are you sure you want to delete this captain?")) return;

    try {
      await api.delete(`/captains/${id}`);
      fetchCaptains();
    } catch (err) {
      console.error("Delete captain error:", err);
    }
  };

  return (
    <div className="p-8">
      <h1
        className="text-4xl font-extrabold mb-8 bg-clip-text text-transparent
                   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                   drop-shadow-lg"
      >
        Captains
      </h1>

      <div className="bg-white shadow-lg rounded-lg divide-y divide-gray-200">
        {captains.map((c) => (
          <div
            key={c._id}
            className="flex flex-wrap md:flex-nowrap items-center justify-between px-6 py-5 hover:bg-gray-50 transition-all"
          >
            {/* Captain Info */}
            <div className="flex items-start gap-4 min-w-[280px] flex-1">
              <div className="bg-indigo-100 text-indigo-600 p-4 rounded-full flex items-center justify-center shadow-sm">
                <FaCarSide className="text-2xl" />
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <p className="font-semibold text-gray-800 text-lg truncate">
                  {c.fullname.firstname} {c.fullname.lastname}
                </p>
                <p className="text-gray-500 text-sm break-words">{c.email}</p>
                {c.address && (
                  <p className="text-gray-500 text-sm flex items-center gap-2 break-words">
                    <FaMapMarkerAlt className="text-red-500 text-lg" />
                    <span className="whitespace-normal break-words">{c.address}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Right Side Info */}
            <div className="flex flex-wrap items-center gap-4 mt-3 md:mt-0">
              {/* Vehicle Plate */}
              <div
                className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg
                           text-gray-700 font-medium min-w-[150px] justify-center shadow-sm"
              >
                <FaCarSide className="text-green-600 text-xl" />
                <span className="text-sm">{c.vehicle?.plate || "-"}</span>
              </div>

              {/* Earnings */}
              <div
                className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg
                           text-gray-700 font-medium min-w-[120px] justify-center shadow-sm"
              >
                <FaRupeeSign className="text-yellow-500 text-xl" />
                <span className="text-sm">{c.totalEarnings || 0}</span>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteCaptain(c._id)}
                className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full
                           flex items-center justify-center h-12 w-12 shadow-md"
                title="Delete Captain"
              >
                <FaTrashAlt className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Captains;
