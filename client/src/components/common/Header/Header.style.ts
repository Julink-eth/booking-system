import styled from "styled-components";
import { Card } from "../Card";

export const CardContainer = styled(Card)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ButtonMenuContainer = styled.div`
  margin-left: 40px;
  display: flex;
  flex-direction: row;
  gap: 30px;
`;
