import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ path, ...props }) {
  const { isUserLoggedIn } = useSelector((state) => state.auth);

  return isUserLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}

export default PrivateRoute;
