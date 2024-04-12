import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing } from '../../redux/auth/selectors';

export const PrivateRoute = ({
  component: Component,
  redirectTo = '/login'
}) => {
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing)

  return (
    isAuthenticated || isRefreshing ? Component : <Navigate to={redirectTo} />
  );
}