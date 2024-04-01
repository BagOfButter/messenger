import { useRef, useState, useEffect } from "react";
import MenuNavigation from "@widgets/MenuNavigation/MenuNavigation";
import {
  MenuContainer,
  MenuStrip,
  StyledMenuIcon,
  Overlay,
} from "@widgets/BurgerMenu/ui/styled";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <MenuStrip>
        <StyledMenuIcon onClick={toggleMenu} />
      </MenuStrip>
      <MenuContainer ref={menuRef} isOpen={isOpen}>
        <MenuNavigation onClose={handleCloseMenu} />
      </MenuContainer>
      <Overlay isOpen={isOpen} />
    </>
  );
};

export default BurgerMenu;
