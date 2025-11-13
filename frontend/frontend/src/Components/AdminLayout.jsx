// components/AdminLayout.jsx
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full">{children}</div>
    </div>
  );
};

export default AdminLayout;
