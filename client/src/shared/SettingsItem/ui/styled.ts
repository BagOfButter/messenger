import styled from "styled-components";

export const SettingsItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SettingsName = styled.h2`
  color: #042a62;
`;

export const SettingsRadioInput = styled.input`
  appearance: none;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #075e9d;
  cursor: pointer;

  &:checked {
    background-color: #042a62;
    border-color: #042a62;
  }
`;
