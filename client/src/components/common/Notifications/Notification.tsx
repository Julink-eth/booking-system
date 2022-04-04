import React, { ReactElement } from "react";
import { ButtonCommon } from "../Button";
import { NotificationContent, NotificationStyled } from "./Notifications.style";

interface Props {
  children?: ReactElement;
  onClose?: () => void;
}

export const Notification = ({ children, onClose }: Props) => {
  return (
    <NotificationStyled>
      <NotificationContent>
        <div></div>
        {children}
        <ButtonCommon onClick={() => onClose && onClose()}>Close</ButtonCommon>
      </NotificationContent>
    </NotificationStyled>
  );
};
