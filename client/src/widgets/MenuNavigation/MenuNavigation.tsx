import { useNavigate } from "react-router-dom";
import LogoutButton from "@widgets/LogoutButton/LogoutButton";
import {
  MenuOption,
  ProfileRow,
  Nickname,
  ProfilePicture,
} from "@widgets/MenuNavigation/ui/styled";
import { useAppSelector } from "@shared/useAppSelector/useAppSelector";
import ContactsIcon from "@assets/contacts.svg?react";
import SettingsIcon from "@assets/settings.svg?react";
import NewChatIcon from "@assets/newchat.svg?react";

type MenuNavigationProps = {
  onClose: () => void;
};

const MenuNavigation = ({ onClose }: MenuNavigationProps) => {
  const navigate = useNavigate();
  const username = useAppSelector((state) => state.userState.username);

  const handleOptionClick = (destination: string) => {
    navigate(destination);
    onClose();
  };

  return (
    <>
      <ProfileRow>
        <ProfilePicture src="https://picsum.photos/65" alt="profile picture" />
        <Nickname>{username}</Nickname>
      </ProfileRow>
      <MenuOption onClick={() => handleOptionClick("/new-chat")}>
        <NewChatIcon />
        <p>New Chat</p>
      </MenuOption>
      <MenuOption onClick={() => handleOptionClick("/contacts")}>
        <ContactsIcon />
        <p>Contacts</p>
      </MenuOption>
      <MenuOption onClick={() => handleOptionClick("/settings")}>
        <SettingsIcon />
        <p>Settings</p>
      </MenuOption>
      <LogoutButton />
    </>
  );
};

export default MenuNavigation;
