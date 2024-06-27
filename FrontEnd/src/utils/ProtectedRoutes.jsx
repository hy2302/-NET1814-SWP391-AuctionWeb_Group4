import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoutes = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
        if (user.role.roleName === 'admin') {
            return <Outlet />;
        } else {
            return <Navigate to="/*" />;
        }
    } else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoutes