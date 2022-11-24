import { Route, Routes as MainRoutes } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../containers/dashboard";
import { PublicRoute, ProtectedRoute } from "./PublicPrivateRouting";

export default function Routes() {
    return (
        <MainRoutes>
            <Route element={<PublicRoute />}>
                <Route path="/" element={<Login />} />
                <Route path={'/login'} element={<Login />} />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path={'/dashboard'} element={<Dashboard />} />
            </Route>
        </MainRoutes>
    );
}
