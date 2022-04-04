import { useContract } from "./useContract";
import { useWeb3React } from "@web3-react/core";
import { useAppContext } from "../AppContext";
import useIsValidNetwork from "./useIsValidNetwork";
import { getCompanyBytes1 } from "../utils/utils";
import BookingSystemArtifact from "../contracts/BookingSystem.json";
import contractAddress from "../contracts/contract-address.json";

export const useBookingSystemContract = () => {
  const { account } = useWeb3React();
  const { isValidNetwork } = useIsValidNetwork();
  const bookingSystemContract = useContract(
    contractAddress.BookingSystem,
    BookingSystemArtifact.abi
  );

  const { setTxnStatus, setContentError } = useAppContext();

  const fetchHoursAvailable = async (
    roomNumber: string,
    companyNumber: string
  ) => {
    const hoursAvailable = await bookingSystemContract.getHoursAvailable(
      roomNumber,
      getCompanyBytes1(companyNumber)
    );
    return hoursAvailable;
  };

  const fetchReservationsByUser = async (user: string) => {
    const reservations = await bookingSystemContract.getReservations(user);
    return reservations;
  };

  const bookMeetingRoom = async (
    roomNumber: string,
    hour: string,
    company: string
  ) => {
    if (account && isValidNetwork) {
      try {
        setTxnStatus("LOADING");
        const txn = await bookingSystemContract.book(
          roomNumber,
          hour,
          getCompanyBytes1(company)
        );
        await txn.wait(1);
        setTxnStatus("COMPLETE");
      } catch (error: any) {
        setContentError(error.message);
        setTxnStatus("ERROR");
      }
    }
  };

  const cancelReservation = async (roomNumber: string, hour: string) => {
    if (account && isValidNetwork) {
      try {
        setTxnStatus("LOADING");
        const txn = await bookingSystemContract.cancel(roomNumber, hour);
        await txn.wait(1);
        setTxnStatus("COMPLETE");
      } catch (error: any) {
        setContentError(error.message);
        setTxnStatus("ERROR");
      }
    }
  };

  return {
    fetchHoursAvailable,
    bookMeetingRoom,
    fetchReservationsByUser,
    cancelReservation,
  };
};
