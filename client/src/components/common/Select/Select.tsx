import React, { SelectHTMLAttributes } from "react";
import { Text } from "../Text";
import { DropdownOption, DropdownSelect, Wrapper } from "./Select.style";

export interface Option extends HTMLSelectElement {
  label: string;
  value: string;
}

interface Props extends SelectHTMLAttributes<Option> {
  label?: string;
  options: Option[];
  onValueChange?: (value: string) => void;
}

export function Select({
  className,
  label,
  options,
  defaultValue,
  placeholder,
  value,
  onValueChange = (item) => console.log("Selected ", item),
  ...props
}: Props) {
  function handleOnChange(e: React.ChangeEvent<Option>) {
    onValueChange(e.currentTarget.value);
  }

  return (
    <Wrapper className={className}>
      {label && <Text>{label}</Text>}
      <DropdownSelect onChange={handleOnChange} value={value} {...props}>
        <DropdownOption value={defaultValue} disabled hidden>
          {placeholder}
        </DropdownOption>
        {options.map((item) => (
          <DropdownOption key={item.value} value={item.value}>
            {item.label}
          </DropdownOption>
        ))}
      </DropdownSelect>
    </Wrapper>
  );
}
