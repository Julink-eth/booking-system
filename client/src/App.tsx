import React from "react";

import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";
import { AppContextProvider } from "./AppContext";
import { Booking } from "./components/pages/Booking";
import { Header } from "./components/common/Header";
import { GlobalError } from "./components/common/GlobalError";
import { Container } from "./App.style";
import { Notifications } from "./components/common/Notifications";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { UserBooking } from "./components/pages/UserBooking";
import { PageContainer } from "./components/pages/PageContainer";

function getLibrary(
  provider:
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc
) {
  return new ethers.providers.Web3Provider(provider);
}

const App = () => {
  if (window.ethereum) {
    window.ethereum.on("networkChanged", () => window.location.reload());
  }

  return (
    <AppContextProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <BrowserRouter basename="/booking-system">
          <Container>
            <GlobalError />
            <Notifications />
            <Header />
            <PageContainer>
              <Routes>
                <Route path="/" element={<Booking />} />
                <Route path="/userBooking" element={<UserBooking />} />
              </Routes>
            </PageContainer>
          </Container>
        </BrowserRouter>
      </Web3ReactProvider>
    </AppContextProvider>
  );
};

export default App;
