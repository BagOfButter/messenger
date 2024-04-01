import { authActions } from "@features/authorization/models/actions";
import { userActions } from "@features/user/models/actions";
import { useAppDispatch } from "@shared/useAppDispatch/useAppDispatch";
import { useAppSelector } from "@shared/useAppSelector/useAppSelector";
import { logoutUser } from "@widgets/LogoutButton/api/logout";
import { MenuOption } from "@widgets/MenuNavigation/ui/styled";
import LogoutIcon from "@assets/logout.svg?react";
import { settingsActions } from "@features/settings/models/actions";

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.authState.userId);

  const handleLogout = async () => {
    try {
      const response = await logoutUser(userId);
      if (response.status === 200) {
        dispatch(authActions.logout());
        dispatch(userActions.removeUser());
        dispatch(settingsActions.clearSettings());
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };
  return (
    <MenuOption onClick={handleLogout}>
      <LogoutIcon />
      <p>Logout</p>
    </MenuOption>
  );
};

export default LogoutButton;
