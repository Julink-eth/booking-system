import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Container, HoursContainer, SelectWrapper } from "./Booking.style";
import { Option } from "../../common/Select/Select";
import { Text } from "../../common/Text";
import { ButtonAction, ButtonCommon } from "../../common/Button";
import { useBookingSystemContract } from "../../../hooks/useBookingSystemContract";

export const Booking = () => {
  const [companySelected, setCompanySelected] = useState("0");
  const [roomSelected, setRoomSelected] = useState("1");
  const [hourSelected, setHourSelected] = useState(undefined || "");
  const [hoursAvailable, setHoursAvailable] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const { active } = useWeb3React();
  const { fetchHoursAvailable, bookMeetingRoom } = useBookingSystemContract();

  const bookableHours = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];

  useEffect(() => {
    let mounted = true;
    mounted && active && getHoursAvailable();
    return () => {
      mounted = false;
    };
  }, [active, roomSelected, companySelected]);

  const handleOnCompanyChange = (value: string) => {
    setCompanySelected(value);
  };

  const handleOnRoomChange = (value: string) => {
    setRoomSelected(value);
  };

  const handleOnHourChange = (value: string) => {
    setHourSelected(value);
  };

  const handleSubmitButtonState = (hours: Array<boolean>) => {
    setSubmitButtonDisabled(false);
    for (let indexHour = 0; indexHour < bookableHours.length; indexHour++) {
      !hours[indexHour] &&
        hourSelected === bookableHours[indexHour] &&
        setSubmitButtonDisabled(true);
    }
  };

  const handleSubmitClick = async () => {
    await bookMeetingRoom(roomSelected, hourSelected, companySelected);
    getHoursAvailable();
  };

  const getHoursAvailable = async () => {
    const result = await fetchHoursAvailable(roomSelected, companySelected);
    setHoursAvailable(result);
    handleSubmitButtonState(result);
  };

  const renderMeetingRoomStateByHour = () => {
    let indexHour = -1;
    return bookableHours.map((hour) => {
      indexHour++;
      return (
        <ButtonCommon
          onClick={(e) => {
            handleOnHourChange(e.currentTarget.value);
            setSubmitButtonDisabled(false);
          }}
          key={hour}
          value={hour}
          itemProp={hour === hourSelected ? "selected" : undefined}
          disabled={!hoursAvailable[indexHour]}
        >
          {hour} : 00
        </ButtonCommon>
      );
    });
  };

  //Static options
  const companyOptions: Option[] = [
    {
      label: "COKE",
      value: "0",
      ...Object.create(HTMLSelectElement.prototype, {}),
    },
    {
      label: "PEPSI",
      value: "1",
      ...Object.create(HTMLSelectElement.prototype, {}),
    },
  ];

  const meetingRoomsOptions = [];
  for (let i = 1; i <= 20; i++) {
    meetingRoomsOptions.push({
      label: "Meeting Room number " + i,
      value: i.toString(),
      ...Object.create(HTMLSelectElement.prototype, {}),
    });
  }

  return (
    <Container>
      <SelectWrapper
        options={companyOptions}
        label="Choose your Company : "
        onValueChange={(value) => handleOnCompanyChange(value)}
      />
      <SelectWrapper
        options={meetingRoomsOptions}
        label="Choose your Meeting Room : "
        onValueChange={(value) => handleOnRoomChange(value)}
      />

      <Text t4="true">
        {"Choose a time to book the meeting room number " + roomSelected}
      </Text>
      <HoursContainer>{renderMeetingRoomStateByHour()}</HoursContainer>
      {hourSelected && (
        <ButtonAction
          onClick={() => handleSubmitClick()}
          disabled={submitButtonDisabled}
        >
          Book the meeting room number {roomSelected} at {hourSelected}:00
        </ButtonAction>
      )}
    </Container>
  );
};
