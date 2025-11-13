import { useEffect, useState } from 'react';
import { FaTrashAlt, FaUserCircle } from 'react-icons/fa';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data.users);
    } catch (err) {
      console.error('Users fetch error: ', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error('Delete user error: ', err);
    }
  };

  return (
    <div className="p-8">
        <h1 className="text-4xl font-extrabold mb-8 bg-clip-text text-transparent 
               bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
               drop-shadow-lg">
      Users
    </h1>

      <div className="grid gap-4">
        {users.map(u => (
          <div
            key={u._id}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-indigo-500 text-3xl" />
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {u.fullname.firstname} {u.fullname.lastname}
                </p>
                <p className="text-gray-500 text-sm">{u.email}</p>
              </div>
            </div>
            <button
              onClick={() => deleteUser(u._id)}
              className="mt-3 sm:mt-0 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all"
            >
              <FaTrashAlt className="text-white" /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
