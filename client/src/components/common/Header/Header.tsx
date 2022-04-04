/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { Text } from "../Text";

import { MetamaskConnectButton } from "../MetamaskConnectButton";
import {
  ButtonMenuContainer,
  CardContainer,
  MenuContainer,
} from "./Header.style";
import { ButtonMenu } from "../Button";
import { useNavigate } from "react-router-dom";

const getMenuId = () => {
  const currentLocation = location.href.substring(
    location.href.lastIndexOf("/") + 1
  );
  switch (currentLocation) {
    case "userBooking":
      return 1;
    default:
      return 0;
  }
};

export const Header = () => {
  const [selectedMenu, setSelectedMenu] = useState(getMenuId());
  const navigate = useNavigate();

  const handleMenuClick = (menuId: number) => {
    setSelectedMenu(menuId);
    switch (menuId) {
      case 1:
        navigate("/userBooking");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <CardContainer>
      <MenuContainer>
        <Text t2="true">BOOKING SYSTEM</Text>
        <ButtonMenuContainer>
          <ButtonMenu
            defaultChecked={selectedMenu === 0}
            onClick={() => handleMenuClick(0)}
          >
            Book a meeting room
          </ButtonMenu>
          <ButtonMenu
            defaultChecked={selectedMenu === 1}
            onClick={() => handleMenuClick(1)}
          >
            My Bookings
          </ButtonMenu>
        </ButtonMenuContainer>
      </MenuContainer>
      <MetamaskConnectButton />
    </CardContainer>
  );
};
