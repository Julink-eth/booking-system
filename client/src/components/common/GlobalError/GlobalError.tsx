import React, { useEffect } from "react";
import { useAppContext } from "../../../AppContext";
import { GlobalErrorStyled } from "./GlobalError.style";
import { Text } from "../Text";
import { theme } from "../../../assets/themes";

export const GlobalError = () => {
  const { contentError, setContentError } = useAppContext();

  useEffect(() => {
    if (contentError) {
      setTimeout(() => {
        setContentError("");
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentError]);

  if (!contentError) {
    return null;
  }
  return (
    <GlobalErrorStyled>
      <Text color={theme.lightGray}>{contentError}</Text>
    </GlobalErrorStyled>
  );
};
