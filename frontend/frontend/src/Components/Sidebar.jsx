import { NavLink, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaCar, FaRoad, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('aToken');
    navigate('/admin/login');
  };

  const links = [
    { name: 'Dashboard', to: '/admin/dashboard', icon: <FaTachometerAlt /> },
    { name: 'Users', to: '/admin/users', icon: <FaUsers /> },
    { name: 'Captains', to: '/admin/captains', icon: <FaCar /> },
    { name: 'Rides', to: '/admin/rides', icon: <FaRoad /> },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white flex flex-col p-6">
      <img src="/image.png" alt="NammaRide Logo" className="w-24 -mt-5 justify-start -ml-2" style={{ filter: 'brightness(0) invert(1)' }} />
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.to}
          className={({ isActive }) =>
            `flex items-center gap-3 mb-4 hover:text-indigo-400 ${
              isActive ? 'text-indigo-400 font-bold' : ''
            }`
          }
        >
          <span className="text-lg">{link.icon}</span>
          {link.name}
        </NavLink>
      ))}

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
