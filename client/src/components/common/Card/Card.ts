import styled from "styled-components";
import { colors } from "../../../assets/themes";

export const Card = styled.div`
  background-color: ${colors.lightGray};
  width: 100%;
  box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;

  border-color: ${colors.lightBlue};
  padding: 20px;
  box-sizing: border-box;
`;
