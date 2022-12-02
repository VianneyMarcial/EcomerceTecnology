import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  } // Aquí le debemos decir la ruta a la que queremos llevar
}; 

export default ProtectedRoutes;
