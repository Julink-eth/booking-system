import styled from "styled-components";
import { colors, textSizes } from "../../../assets/themes";

export const ButtonCommon = styled.button`
  background-color: ${(p) => (p.itemProp ? colors.purple : colors.darkBlue)};
  color: ${colors.lightGray};
  padding: 10px;
  border-radius: 10px;
  border-style: none;
  cursor: pointer;
  font-family: Inter custom, sans-serif;
  font-size: ${textSizes.t4};
  &:hover {
    background-color: ${(p) => (p.itemProp ? colors.purple : colors.lightBlue)};
  }

  &:disabled {
    background-color: ${colors.lightBlue};
    cursor: unset;
  }
`;

export const ButtonAction = styled(ButtonCommon)`
  background-color: ${(p) => (p.itemProp ? colors.purple : colors.green)};
  &:hover {
    background-color: ${(p) =>
      p.itemProp ? colors.purple : colors.lightGreen};
  }

  &:disabled {
    background-color: ${colors.lightGreen};
  }
`;

export const ButtonAlert = styled(ButtonCommon)`
  background-color: ${(p) => (p.itemProp ? colors.purple : colors.red)};
  &:hover {
    background-color: ${(p) => (p.itemProp ? colors.purple : colors.lightRed)};
  }

  &:disabled {
    background-color: ${colors.lightRed};
  }
`;

export const ButtonMenu = styled(ButtonCommon)`
  background-color: ${(p) =>
    p.defaultChecked ? colors.darkBrown : colors.brown};
  &:hover {
    background-color: ${colors.darkBrown};
  }
`;
