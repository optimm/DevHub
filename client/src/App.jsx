import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCheckMyAuthQuery } from "./app/services/userApi";
import Navbar from "./components/Navbar";
import { Notification } from "./components/Notification";
import { authenticateMe } from "./features/meSlice";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.me);
  const { data, error, isError, isSuccess, isLoading, isFetching } =
    useCheckMyAuthQuery();

  return (
    <>
      {isLoading || isFetching ? (
        <>Loading...</>
      ) : (
        <>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Home />
                  </>
                }
              />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/register"} element={<Register />} />
            </Routes>
          </BrowserRouter>
          <Notification />
        </>
      )}
    </>
  );
};

export default App;
