import styled from "styled-components";
import { textSizes } from "../../../assets/themes";
import { SelectHTMLAttributes } from "react";
import { Option } from "./Select";

export const Wrapper = styled.div``;

export const DropdownSelect = styled.select<SelectHTMLAttributes<Option>>`
  font-size: ${textSizes.t3};
`;

export const DropdownOption = styled.option``;
