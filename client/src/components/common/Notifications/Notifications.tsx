import React, { useEffect, useRef } from "react";
import { useAppContext } from "../../../AppContext";
import { Text } from "../Text";
import { Notification } from "./Notification";
import MoonLoader from "react-spinners/MoonLoader";
import { theme } from "../../../assets/themes";
import { SpaceLoader } from "./Notifications.style";

export const Notifications = () => {
  const { txnStatus, setTxnStatus } = useAppContext();
  const handleOnCloseClick = () => setTxnStatus("NOT_SUBMITTED");
  const txnStatusRef = useRef(txnStatus);
  txnStatusRef.current = txnStatus;

  useEffect(() => {
    let mounted = true;
    mounted &&
      (txnStatus === "COMPLETE" || txnStatus === "ERROR") &&
      setTimeout(() => {
        if (txnStatusRef.current !== "LOADING") {
          setTxnStatus("NOT_SUBMITTED");
        }
      }, 5000);
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txnStatus]);

  const getMessage = () => {
    let headerText = "";
    switch (txnStatus) {
      case "LOADING":
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text t4="true" color={theme.lightGray}>
              Transaction pending
            </Text>
            <SpaceLoader></SpaceLoader>
            <MoonLoader loading={true} size={25} />
          </div>
        );

      case "COMPLETE":
        headerText = "Transaction completed!";
        break;
      case "ERROR":
        headerText = "An error occurred";
        break;
      default:
        headerText = "An error occurred";
        break;
    }

    return (
      <Text t4="true" color={theme.lightGray}>
        {headerText}
      </Text>
    );
  };

  return (
    <>
      {txnStatus !== "NOT_SUBMITTED" && (
        <Notification onClose={handleOnCloseClick}>{getMessage()}</Notification>
      )}
    </>
  );
};
