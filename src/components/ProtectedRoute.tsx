import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  //const adminToken = localStorage.getItem('admin_token');

  //if (!adminToken) {
  //  return <Navigate to="/admin/login" replace />;
  //}
  const adminToken = true; // Tạm thời luôn cho phép truy cập
  return <>{children}</>;
};

export default ProtectedRoute;