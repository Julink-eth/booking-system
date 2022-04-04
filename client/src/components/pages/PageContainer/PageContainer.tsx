import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Container } from "./PageContainer.style";
import { Text } from "../../common/Text";

export const PageContainer = ({ children }: any) => {
  const { active } = useWeb3React();

  return (
    <>
      <Container hidden={!active}>{children}</Container>
      <Container hidden={active}>
        <Text t2="true">
          Please connect to your metamask to interact with BOOKING SYSTEM
        </Text>
      </Container>
    </>
  );
};
