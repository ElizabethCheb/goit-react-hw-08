import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from './redux/auth/operations.js';
import { selectIsRefreshing } from './redux/auth/selectors.js';
import { RestrictedRoute } from './components/RestrictedRoute/RestrictedRoute.jsx';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute.jsx';
import Layout from './components/Layout/Layout.jsx';
import { Toaster } from 'react-hot-toast';


const HomePage = lazy(() => import('./pages/Home.jsx'));
const RegisterPage = lazy(() => import('./pages/Registration.jsx'));
const LoginPage = lazy(() => import('./pages/Login.jsx'));
const ContactsPage = lazy(() => import('./pages/Contacts.jsx'));

export default function App() {
  const isRefreshing = useSelector(selectIsRefreshing);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Layout>
      <Toaster />
      {isRefreshing ? (
        <b>Refreshing user, please wait...</b>
      ) : (
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  component={<RegisterPage />}
                  redirectTo="/contacts"
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  component={<LoginPage />}
                  redirectTo="/contacts"
                />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  component={<ContactsPage />}
                  redirectTo="/login"
                />
              }
            />
          </Routes>
        </Suspense>
      )}
    </Layout>
  );
}