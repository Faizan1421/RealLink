import React, { Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import Bookings from "./pages/Bookings";
import Favourites from "./pages/Favourites";
import Layout from "./components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/Property";
import UserDetailContext from "./context/userDetailContext";
import Chat from "./components/Chat";

const App = () => {
  const queryClient = new QueryClient();
  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });
  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading data...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/listing">
                  <Route index element={<Listing />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                {/* <Route path="/chat" element={<Chat />}></Route> */}
                <Route path="/bookings" element={<Bookings />}></Route>
                <Route path="/favourites" element={<Favourites />}></Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
};

export default App;
