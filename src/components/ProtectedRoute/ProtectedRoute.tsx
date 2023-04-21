import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { PropsWithChildren } from "react";

interface ProtectedRouteProps extends PropsWithChildren {}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (user === undefined || user === null) {
    return <p>Loading...</p>;
  }

  if (user === false) {
    return <Navigate to="/tosignin" />;
  }

  return <>{children}</>;
}
