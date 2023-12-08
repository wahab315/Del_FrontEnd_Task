import { Suspense } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../controllers/authController";

const ProtectedRoutes = () => {
  const { authenticated, session } = useAuth();
  return authenticated ? (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={`/`} />
  );
};

export default ProtectedRoutes;
