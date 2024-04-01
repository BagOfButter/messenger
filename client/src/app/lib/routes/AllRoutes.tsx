import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '@shared/PrivateRoute/PrivateRoute';

const Layout = lazy(() => import('@pages/Layout/Layout'));
const Chat = lazy(() => import('@pages/Chat/Chat'));
const Settings = lazy(() => import('@pages/Settings/Settings'));
const Contacts = lazy(() => import('@pages/Contacts/Contacts'));
const UserInfo = lazy(() => import('@pages/UserInfo/UserInfo'));
const Login = lazy(() => import('@pages/Login/Login'));
const Register = lazy(() => import('@pages/Register/Register'));

export const AllRoutes = () => {
    return (
      <Routes>
        <Route
        path="/"
        element={<PrivateRoute component={<Layout />} redirectTo="/login" alreadyLogged={false} />}
        >
          <Route
          path="/:id"
          element={<PrivateRoute component={<Chat />} redirectTo="/login" alreadyLogged={false} />}
          />
          <Route
          path="/settings"
          element={<PrivateRoute component={<Settings />} redirectTo="/login" alreadyLogged={false} />}
          />
          <Route
          path="/contacts"
          element={<PrivateRoute component={<Contacts />} redirectTo="/login" alreadyLogged={false} />}
          >
              <Route
              path="/contacts/:id"
              element={<PrivateRoute component={<UserInfo />} redirectTo="/login" alreadyLogged={false} />}
              />
          </Route>
        </Route>
        <Route
        path="/login"
        element={<PrivateRoute component={<Login />} redirectTo="/" alreadyLogged={true} />}
        />
        <Route
        path="/register"
        element={<PrivateRoute component={<Register />} redirectTo="/" alreadyLogged={true} />}
        />
      </Routes>
    );
  };