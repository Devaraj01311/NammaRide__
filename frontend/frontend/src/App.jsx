import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Captains from './pages/Captains';
import Rides from './pages/Rides';
import PrivateRoute from './Components/PrivateRoute';
import AdminLayout from './Components/AdminLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" />} />

      {/* Public route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Users />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/captains"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Captains />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/rides"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Rides />
            </AdminLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
