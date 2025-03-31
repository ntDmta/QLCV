import { Navigate } from 'react-router-dom';

interface UserProtectedRouteProps {
  children: React.ReactNode;
}

const UserProtectedRoute: React.FC<UserProtectedRouteProps> = ({ children }) => {
  //const userToken = localStorage.getItem('user_token');

  //if (!userToken) {
  //  return <Navigate to="/login" replace />;
  //}
  const userToken = true; // Tạm thời luôn cho phép truy cập
  return <>{children}</>;
};

export default UserProtectedRoute;