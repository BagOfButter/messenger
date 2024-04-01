import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@shared/useAppSelector/useAppSelector';

type TProps = {
  component: ReactNode;
  redirectTo: string;
  alreadyLogged: boolean;
};

export const PrivateRoute = ({
  component: Component,
  redirectTo: address,
  alreadyLogged: logged,
}: TProps) => {
  const location = useLocation();
  const { isLoggedIn } = useAppSelector(state => state.authState);
  if (logged) {
    return isLoggedIn ? (
      <Navigate to={address} state={{ from: location }} />
    ) : (
      Component
    );
  }
  return !isLoggedIn ? (
    <Navigate to={address} state={{ from: location }} />
  ) : (
    Component
  );
};