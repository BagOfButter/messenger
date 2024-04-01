import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import BurgerMenu from "@widgets/BurgerMenu/BurgerMenu";
import ChatList from "@widgets/ChatList/ChatList";
import { LayoutContainer } from "@pages/Layout/ui/styled";

const Layout = () => {
  return (
    <LayoutContainer>
      <BurgerMenu />
      <ChatList />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </LayoutContainer>
  );
};

export default Layout;
