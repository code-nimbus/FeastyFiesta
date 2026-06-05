import { useAppData } from "../context/AppContext";
import { Navigate, useLocation, Outlet } from "react-router-dom";


const ProtectedRoute = () => {
    const { isAuth, user, loading } = useAppData()
    const location = useLocation()

    if (loading) return null



    if (!isAuth) {
        return <Navigate to={"/login"} replace />
    }


    if (user?.role === null && location.pathname !== "/select-role") {
        return <Navigate to={"/select-role"} />
    }

    // if (user?.role !== null && location.pathname === "/select-role") {
    //     return <Navigate to={"/"} />
    // }

    return <Outlet />
}

export default ProtectedRoute;