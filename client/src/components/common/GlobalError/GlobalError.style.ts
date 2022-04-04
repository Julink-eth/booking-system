import styled from "styled-components";
import { colors } from "../../../assets/themes";

export const GlobalErrorStyled = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 9999;
  background-color: ${colors.red};
  padding: 10px;
  text-align: center;
`;
