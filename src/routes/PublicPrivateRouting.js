import { Navigate, Outlet } from "react-router-dom";
import { isLogin } from "../pages/login";

export const PublicRoute = () => {
    const authData = localStorage.getItem(isLogin);
    if (authData) {
        return <Navigate to={'/dashboard'} replace />;
    }
    return (
        <div>
            <Outlet />
        </div>
    )
}

export const ProtectedRoute = () => {
    const authData = localStorage.getItem(isLogin);
    if (!authData) {
        return <Navigate to={'/login'} replace />;
    }
    return (
        <div>
            <Outlet />
        </div>
    )
}