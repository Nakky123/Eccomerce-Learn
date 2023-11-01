// PrivateRoute.js
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth;

  return user ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
