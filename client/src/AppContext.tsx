import React, { createContext, useReducer } from "react";
const initialContext = {
  txnStatus: "NOT_SUBMITTED",
  setTxnStatus: (status: string) => {},
  contentError: undefined,
  setContentError: (error: string) => {},
};

interface ActionPayload {
  type: string;
  payload: string | number | boolean;
}

const appReducer = (state: any, { type, payload }: ActionPayload) => {
  switch (type) {
    case "SET_TXN_STATUS":
      return {
        ...state,
        txnStatus: payload,
      };
    case "SET_CONTENT_ERROR":
      return {
        ...state,
        contentError: payload,
      };
    default:
      return state;
  }
};

const AppContext = createContext(initialContext);
export const useAppContext = () => React.useContext(AppContext);
export const AppContextProvider: React.FC = ({ children }) => {
  const [store, dispatch] = useReducer(appReducer, initialContext);

  const contextValue = {
    txnStatus: store.txnStatus,
    setTxnStatus: (status: string) => {
      dispatch({ type: "SET_TXN_STATUS", payload: status });
    },
    contentError: store.contentError,
    setContentError: (error: string) => {
      dispatch({ type: "SET_CONTENT_ERROR", payload: error });
    },
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
