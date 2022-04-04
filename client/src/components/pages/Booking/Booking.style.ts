import styled from "styled-components";
import { Select } from "../../common/Select/Select";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const SelectWrapper = styled(Select)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const HoursContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
`;
