import { Suspense } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../controllers/authController";

const PublicRoutes = () => {
  const { authenticated } = useAuth();
  return !authenticated ? (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={"/register_car"} />
  );
};

export default PublicRoutes;
