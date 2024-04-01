/// <reference types="vite-plugin-svgr/client" />

import styled from "styled-components";
import MenuIcon from "@assets/menu.svg?react";

type MenuProps = {
  isOpen: boolean;
};

export const MenuStrip = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  position: static;
  color: #ffffff;
  background-color: #075e9d;
  width: 80px;
  height: 100vh;
  top: 0;
  left: 0;
`;

export const MenuContainer = styled.div<MenuProps>`
  display: flex;
  flex-direction: column;
  position: fixed;
  color: #ffffff;
  background-color: #075e9d;
  width: 350px;
  height: 100vh;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-350px")};
  transition: left 0.2s ease-out;
  z-index: 2;
`;

export const StyledMenuIcon = styled(MenuIcon)`
  margin: 15px 0 0 0;
  cursor: pointer;
  &:hover {
    stroke: #042a62;
    fill: #042a62;
  }
`;

export const Overlay = styled.div<MenuProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  opacity: 50%;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 1;
`;
