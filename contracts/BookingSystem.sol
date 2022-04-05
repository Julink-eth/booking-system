//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

/**
 @title Booking Sytem contract
 @author Julien Fontanel
 @notice Allows a user to book/cancel a meeting room at specific hours of the day, for "COLA Day"
 */
contract BookingSystem {
    //Number of meeting rooms available for one company at a specific hour
    uint256 public constant ROOMS_BY_COMPANY = 10;

    //Specific hour min
    uint256 public constant HOUR_MIN = 9;
    //Specific hour max
    uint256 public constant HOUR_MAX = 17;

    //Room number min
    uint256 public constant ROOM_NUMBER_MIN = 1;
    //Room number max
    uint256 public constant ROOM_NUMBER_MAX = 20;

    // Struct defining a meeting room reservation
    struct Reservation {
        bytes1 company; // 0x0 = COKE, 0x1 = PEPSI
        address user; // The user who booked the meeting room
    }

    //Mapping to retreive the meeting room's booking info by room number and by hour of the day
    mapping(uint256 => mapping(uint256 => Reservation)) public reservations;
    //Mapping to get the number of meeting rooms booked from a company at a specific hour
    mapping(bytes1 => mapping(uint256 => uint256)) public roomsByCompanyByHour;

    /**
     @notice Checks if a meeting room is available at a specific hour for the company passed in parameters
     @param roomNumber uint256 The meeting room number to book
     @param hour uint256 The hour of the day to book the meeting room
     @param company bytes1 The user's company who wants to book the meeting room
    */
    modifier roomAvailable(
        uint256 roomNumber,
        uint256 hour,
        bytes1 company
    ) {
        require(
            isRoomAvailable(roomNumber, hour, company),
            "MEETING_ROOM_NOT_AVAILABLE"
        );
        _;
    }

    /**
     @notice Checks if a meeting room has been booked by the user
     @param roomNumber uint256 The meeting room number to check
     @param hour uint256 The hour of the day of the reservation to check
     @param user address The user to check
    */
    modifier bookedByUser(
        uint256 roomNumber,
        uint256 hour,
        address user
    ) {
        require(
            reservations[roomNumber][hour].user == user,
            "NOT_BOOKED_BY_USER"
        );
        _;
    }

    /**
     @notice Checks if the hour passed is correct
     @param hour uint256 The hour of the day of the reservation to check
    */
    modifier correctHour(uint256 hour) {
        require(HOUR_MIN <= hour && hour <= HOUR_MAX, "HOUR_INVALID");
        _;
    }

    /**
     @notice Checks if the room number passed is correct
     @param roomNumber uint256 The room number of the reservation to check
    */
    modifier correctRoomNumber(uint256 roomNumber) {
        require(
            ROOM_NUMBER_MIN <= roomNumber && roomNumber <= ROOM_NUMBER_MAX,
            "ROOM_NUMBER_INVALID"
        );
        _;
    }

    event MeetingRoomBooked(uint256 roomNumber, uint256 hour, bytes1 company);

    event ReservationCanceled(uint256 roomNumber, uint256 hour, bytes1 company);

    constructor() {}

    /**
     @notice Book a meeting room at a specific hour
     @param roomNumber uint256 The meeting room number to book
     @param hour uint256 The hour of the day to book the meeting room
     @param company bytes1 The user's company who is booking the meeting room
     */
    function book(
        uint256 roomNumber,
        uint256 hour,
        bytes1 company
    )
        external
        roomAvailable(roomNumber, hour, company)
        correctHour(hour)
        correctRoomNumber(roomNumber)
    {
        //Store the new reservation
        Reservation storage newReservation = reservations[roomNumber][hour];
        newReservation.company = company;
        newReservation.user = msg.sender;

        //Increment the number of meeting rooms booked from this company at this hour
        roomsByCompanyByHour[company][hour] += 1;

        emit MeetingRoomBooked(roomNumber, hour, company);
    }

    /**
     @notice Cancel the reservation of a meeting room at a specific hour
     @param roomNumber uint256 The meeting room number to cancel the reservation
     @param hour uint256 The hour of the day to cancel the reservation of the meeting room
     */
    function cancel(uint256 roomNumber, uint256 hour)
        external
        bookedByUser(roomNumber, hour, msg.sender)
    {
        bytes1 company = reservations[roomNumber][hour].company;

        //Delete the reservation
        delete reservations[roomNumber][hour];

        //Decrease the number of meeting rooms booked from this company at this hour
        roomsByCompanyByHour[company][hour] -= 1;

        emit ReservationCanceled(roomNumber, hour, company);
    }

    /**
     @notice Checks if a meeting room is available at a specific hour for the company passed in parameters
     @param roomNumber uint256 The meeting room number to book
     @param hour uint256 The hour of the day to book the meeting room
     @param company bytes1 The user's company who is Reservation the room
     @return bool true or false if the room is available or not
    */
    function isRoomAvailable(
        uint256 roomNumber,
        uint256 hour,
        bytes1 company
    ) public view returns (bool) {
        //Checks if the number of booked rooms for this hour from this company has not been reached
        if (roomsByCompanyByHour[company][hour] >= ROOMS_BY_COMPANY) {
            return false;
        }

        //Checks if this meeting room is available at this hour
        if (reservations[roomNumber][hour].user == address(0x0)) {
            return true;
        }

        return false;
    }

    /**
     @notice Returns all the hours for which the meeting room passed is available
     @param roomNumber uint256 The meeting room number to book
     @param company bytes1 The user's company who is booking the meeting room
     @return hoursAvailable bool[9] All the hours available to reserve this meeting room
     */
    function getHoursAvailable(uint256 roomNumber, bytes1 company)
        public
        view
        returns (bool[9] memory)
    {
        bool[9] memory hoursAvailable;
        uint256 indexHour = 0;
        //Checks for every hour
        for (uint256 i = HOUR_MIN; i <= HOUR_MAX; i++) {
            isRoomAvailable(roomNumber, i, company)
                ? hoursAvailable[indexHour] = true
                : hoursAvailable[indexHour] = false;
            indexHour += 1;
        }
        return hoursAvailable;
    }

    /**
     @notice Returns all the reservations made by the user
     @param user address User address who made the reservation
     @return reservations uint256[9][20] containing all the room numbers and hours
     */
    function getReservations(address user)
        public
        view
        returns (uint256[9][20] memory)
    {
        uint256[9][20] memory results;
        //Browse all the meeting rooms
        uint256 indexRoom = 0;
        for (uint256 i = ROOM_NUMBER_MIN; i <= ROOM_NUMBER_MAX; i++) {
            uint256[9] memory hoursBooked;
            //Browse all the hours for each meeting room
            uint256 indexHour = 0;
            for (uint256 j = HOUR_MIN; j <= HOUR_MAX; j++) {
                if (reservations[i][j].user == user) {
                    hoursBooked[indexHour] = j;
                }
                indexHour += 1;
            }

            results[indexRoom] = hoursBooked;
            indexRoom += 1;
        }

        return results;
    }
}
