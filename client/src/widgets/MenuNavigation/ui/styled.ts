import styled from "styled-components";

export const ProfilePicture = styled.img`
  border-radius: 50%;
  border: 2px solid #042a62;
`;

export const Nickname = styled.p`
  font-size: 18px;
  margin-left: 5%;
`;

export const ProfileRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 15px 25px 10px 25px;
`;

export const MenuOption = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #042a62;
  }
  > * {
    margin-left: 25px;
  }
`;
