import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { BookingSystem } from "../typechain";

let bookingSystem: BookingSystem;
let accounts: SignerWithAddress[];
let account1: SignerWithAddress;

const MAX_ROOMS_BY_COMPANY = 10;
const roomNumber1 = 1;
const hourToTest = 9;
const cokeCompany = [0x0];
const pepsiCompany = [0x1];

beforeEach(async () => {
  accounts = await ethers.getSigners();
  account1 = accounts[1];
  const BookingSystem = await ethers.getContractFactory("BookingSystem");
  bookingSystem = await BookingSystem.deploy();
  await bookingSystem.deployed();
});

describe("BookingSystem", function () {
  it("Should return the new availability of the meeting room after it's been booked", async function () {
    expect(
      await bookingSystem.isRoomAvailable(roomNumber1, hourToTest, cokeCompany)
    ).to.equal(true);

    const bookTx = await bookingSystem.book(
      roomNumber1,
      hourToTest,
      cokeCompany
    );
    await bookTx.wait();

    expect(
      await bookingSystem.isRoomAvailable(roomNumber1, hourToTest, cokeCompany)
    ).to.equal(false);
  });

  it("Should return the new availability of the meeting room after its reservation has been canceled", async function () {
    const bookTx = await bookingSystem.book(
      roomNumber1,
      hourToTest,
      cokeCompany
    );
    await bookTx.wait();

    expect(
      await bookingSystem.isRoomAvailable(roomNumber1, hourToTest, cokeCompany)
    ).to.equal(false);

    const cancelTx = await bookingSystem.cancel(roomNumber1, hourToTest);
    await cancelTx.wait();

    expect(
      await bookingSystem.isRoomAvailable(roomNumber1, hourToTest, cokeCompany)
    ).to.equal(true);
  });

  it("Should not be able to book the same meeting room at the same hour twice", async function () {
    const bookTx = await bookingSystem.book(
      roomNumber1,
      hourToTest,
      cokeCompany
    );
    await bookTx.wait();

    await expect(
      bookingSystem.book(roomNumber1, hourToTest, cokeCompany)
    ).to.be.revertedWith("MEETING_ROOM_NOT_AVAILABLE");
  });

  it("Should not be able to cancel a reservation if the user has not made the reservation in the first place", async function () {
    const bookTx = await bookingSystem.book(
      roomNumber1,
      hourToTest,
      cokeCompany
    );
    await bookTx.wait();

    await expect(
      bookingSystem.connect(account1).cancel(roomNumber1, hourToTest)
    ).to.be.revertedWith("NOT_BOOKED_BY_USER");
  });

  it(
    "Should not be able to book more than " +
      MAX_ROOMS_BY_COMPANY +
      " of meeting rooms for a specific hour from the same company",
    async function () {
      for (let i = 1; i <= MAX_ROOMS_BY_COMPANY; i++) {
        const bookTx = await bookingSystem.book(i, hourToTest, cokeCompany);
        await bookTx.wait();
      }

      await expect(
        bookingSystem.book(MAX_ROOMS_BY_COMPANY + 1, hourToTest, cokeCompany)
      ).to.be.revertedWith("MEETING_ROOM_NOT_AVAILABLE");
    }
  );

  it(
    "Should be able to book more than " +
      MAX_ROOMS_BY_COMPANY +
      " of meeting rooms for a specific hour if the 2 companies book meeting rooms",
    async function () {
      for (let i = 1; i <= MAX_ROOMS_BY_COMPANY; i++) {
        const bookTx = await bookingSystem.book(i, hourToTest, cokeCompany);
        await bookTx.wait();
      }

      await expect(
        bookingSystem.book(MAX_ROOMS_BY_COMPANY + 1, hourToTest, pepsiCompany)
      ).to.be.not.revertedWith("MEETING_ROOM_NOT_AVAILABLE");
    }
  );

  it("Should not be able to book a room before 9am and after 5pm", async function () {
    await expect(
      bookingSystem.book(roomNumber1, 8, cokeCompany)
    ).to.be.revertedWith("HOUR_INVALID");

    await expect(
      bookingSystem.book(roomNumber1, 20, cokeCompany)
    ).to.be.revertedWith("HOUR_INVALID");
  });

  it("Should be able to get the available hours for a meeting room", async function () {
    let bookTx = await bookingSystem.book(roomNumber1, hourToTest, cokeCompany);
    await bookTx.wait();

    bookTx = await bookingSystem.book(roomNumber1, 11, cokeCompany);
    await bookTx.wait();

    const availableHours = await bookingSystem.getHoursAvailable(
      roomNumber1,
      cokeCompany
    );

    expect(availableHours[0]).to.equal(false);
    expect(availableHours[1]).to.equal(true);
    expect(availableHours[2]).to.equal(false);
  });

  it("Should be able to get the reservations for a user", async function () {
    let bookTx = await bookingSystem.book(roomNumber1, hourToTest, cokeCompany);
    await bookTx.wait();

    let reservations = await bookingSystem.getReservations(accounts[0].address);

    expect(reservations[0][0]).to.equal(hourToTest);
    expect(reservations[0][1]).to.equal(0);
    expect(reservations[5][1]).to.not.equal(hourToTest);

    bookTx = await bookingSystem.book(5, 14, cokeCompany);
    await bookTx.wait();

    reservations = await bookingSystem.getReservations(accounts[0].address);

    // Index 4 matches roomNumber 5 since roomNumber starts from 1 and index 5 matches hour 14 since
    // the bookable hours go from 9 to 17
    expect(reservations[4][5]).to.equal(14);
    expect(reservations[0][0]).to.equal(hourToTest);
  });
});
