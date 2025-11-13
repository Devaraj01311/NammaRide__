import { useEffect, useState } from 'react';
import api from '../api';
import {
  FaUsers,
  FaCar,
  FaMoneyBillWave,
  FaRoad,
  FaEnvelope,
  FaRupeeSign,
  FaIdBadge,
  FaMotorcycle,
} from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [captains, setCaptains] = useState([]);

  // Fetch dashboard data
  useEffect(() => {
    api
      .get('/dashboard')
      .then((res) => setStats(res.data))
      .catch((err) => console.error('Dashboard fetch error:', err));
  }, []);

  // Fetch captains list
  useEffect(() => {
    api
      .get('/captains')
      .then((res) => setCaptains(res.data.captains))
      .catch((err) => console.error('Captains fetch error:', err));
  }, []);

  const statCards = [
    {
      title: 'Users',
      value: stats.usersCount,
      icon: <FaUsers className="w-8 h-8 text-indigo-500" />,
    },
    {
      title: 'Captains',
      value: stats.captainsCount,
      icon: <FaCar className="w-8 h-8 text-green-500" />,
    },
    {
      title: 'Rides',
      value: stats.ridesCount,
      icon: <FaRoad className="w-8 h-8 text-yellow-500" />,
    },
    {
      title: 'Earnings',
      value: `₹${stats.totalEarnings}`,
      icon: <FaMoneyBillWave className="w-8 h-8 text-red-500" />,
    },
  ];

  return (
    <div className="p-8">
      {/* Heading */}
      <h1
        className="text-4xl font-extrabold mb-8 bg-clip-text text-transparent
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-lg"
      >
        Dashboard
      </h1>

      <hr className="mb-6 border-t-2 border-gray-500" />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="flex items-center p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all cursor-pointer"
          >
            <div className="p-4 bg-gray-100 rounded-full mr-4">{card.icon}</div>
            <div>
              <p className="text-2xl font-bold text-gray-700">{card.value ?? 0}</p>
              <p className="text-gray-500">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Captains Details */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="flex items-center px-6 py-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <FaCar className="text-green-600 text-xl" /> Captains Details
          </h2>
        </div>

        <div className="divide-y max-h-[450px] overflow-y-auto">
          {captains.length > 0 ? (
            captains.slice(0, 10).map((c, idx) => (
              <div
                key={idx}
                className="flex flex-wrap md:flex-nowrap items-center justify-between px-6 py-4 hover:bg-gray-50 transition-all"
              >
                {/* Captain Info */}
                <div className="flex items-center gap-4 min-w-[280px] flex-1">
                  <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full flex items-center justify-center">
                    <FaCar className="text-3xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-lg leading-tight">
                      {c.fullname?.firstname} {c.fullname?.lastname}
                    </p>
                    <p className="text-gray-600 text-sm flex items-center gap-2 break-all">
                      <FaEnvelope className="text-gray-400 text-base" /> {c.email}
                    </p>
                  </div>
                </div>

                {/* Vehicle Info & Earnings */}
                <div className="flex flex-wrap md:flex-nowrap items-center gap-4 mt-3 md:mt-0 justify-end">
                  {/* Vehicle Plate */}
                  <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg text-blue-700 font-medium shadow-sm min-w-[160px] justify-center">
                    <FaIdBadge className="text-blue-500 text-lg" />
                    <span className="text-sm font-semibold tracking-wide">
                      {c.vehicle?.plate || '-'}
                    </span>
                  </div>

                  {/* Vehicle Type */}
                  <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg text-green-700 font-medium shadow-sm min-w-[140px] justify-center">
                    {c.vehicle?.vehicleType === 'Motorcycle' ? (
                      <FaMotorcycle className="text-green-600 text-lg" />
                    ) : (
                      <FaCar className="text-green-600 text-lg" />
                    )}
                    <span className="text-sm capitalize font-semibold">
                      {c.vehicle?.vehicleType || '-'}
                    </span>
                  </div>

                  {/* Earnings */}
                  <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg text-yellow-700 font-medium shadow-sm min-w-[100px] justify-center">
                    <FaRupeeSign className="text-yellow-600 text-lg" />
                    <span className="text-sm font-semibold">
                      {c.totalEarnings || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-6 text-gray-500 text-center">
              No captains found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
