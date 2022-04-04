import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Container, MeetingRoomsContainer } from "./UserBooking.style";
import { Text } from "../../common/Text";
import { ButtonAction, ButtonCommon } from "../../common/Button";
import { useBookingSystemContract } from "../../../hooks/useBookingSystemContract";
interface Reservation {
  roomNumber: number;
  hours: Array<string>;
}

export const UserBooking = () => {
  const { active, account } = useWeb3React();
  const [reservations, setReservations] = useState([] as Array<Array<string>>);
  const [reservationSelected, setReservationSelected] = useState<Reservation>();
  const [hourSelected, setHourSelected] = useState<string>();
  const { fetchReservationsByUser, cancelReservation } =
    useBookingSystemContract();

  useEffect(() => {
    let mounted = true;
    setReservationSelected(undefined);
    mounted && active && getReservations();
    return () => {
      mounted = false;
    };
  }, [active, account]);

  useEffect(() => {
    let mounted = true;
    if (reservationSelected) {
      if (
        mounted &&
        active &&
        reservationSelected.roomNumber &&
        reservations[reservationSelected.roomNumber].length === 0
      ) {
        setReservationSelected(undefined);
      } else {
        reservationSelected.hours =
          reservations[reservationSelected.roomNumber];
      }
    }

    return () => {
      mounted = false;
    };
  }, [reservations]);

  const handleMeetingRoomClick = (reservation: Reservation) => {
    setHourSelected(undefined);
    setReservationSelected(reservation);
  };

  const handleHourClick = (hour: string) => {
    setHourSelected(hour);
  };

  const handleSubmitClick = async () => {
    if (hourSelected && reservationSelected?.roomNumber) {
      await cancelReservation(
        reservationSelected?.roomNumber.toString(),
        hourSelected
      );
      await getReservations();
      setHourSelected(undefined);
    }
  };

  const getReservations = async () => {
    const results = await fetchReservationsByUser(account || "");
    const resFormatted = [];
    for (let i = 0; i < results.length; i++) {
      resFormatted[i + 1] = [] as Array<string>;
      for (let j = 0; j < results[i].length; j++) {
        const hour = results[i][j].toString();
        if (hour !== "0") {
          resFormatted[i + 1].push(hour);
        }
      }
    }
    setReservations(resFormatted);
  };

  const renderReservationRooms = () => {
    return reservations.map((hours, roomNumber) => {
      return (
        hours.length > 0 && (
          <ButtonCommon
            key={roomNumber}
            onClick={() => handleMeetingRoomClick({ roomNumber, hours })}
            itemProp={
              reservationSelected?.roomNumber === roomNumber
                ? "selected"
                : undefined
            }
          >
            Meeting Room number {roomNumber}
          </ButtonCommon>
        )
      );
    });
  };

  const renderReservationHours = () => {
    return reservationSelected?.hours.map((hour) => {
      return (
        <ButtonCommon
          key={hour}
          onClick={() => handleHourClick(hour)}
          itemProp={hourSelected === hour ? "selected" : undefined}
        >
          {hour} : 00
        </ButtonCommon>
      );
    });
  };

  return (
    <Container>
      <Text>Your booked Meeting Rooms</Text>
      <MeetingRoomsContainer>{renderReservationRooms()}</MeetingRoomsContainer>
      {reservationSelected && (
        <>
          <Text>Hours booked</Text>
          <MeetingRoomsContainer>
            {renderReservationHours()}
          </MeetingRoomsContainer>
        </>
      )}
      {hourSelected && (
        <ButtonAction onClick={() => handleSubmitClick()}>
          Cancel your reservation for the meeting room number{" "}
          {reservationSelected?.roomNumber} at {hourSelected}:00
        </ButtonAction>
      )}
    </Container>
  );
};
