import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useApp();

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
