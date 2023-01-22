import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCheckMyAuthQuery } from "./app/services/userApi";
import Navbar from "./components/Navbar";
import { Notification } from "./components/Notification";
import AllProjects from "./pages/AllProjects";
import AllUsers from "./pages/AllUsers";
import { CreateProject } from "./pages/CreateProject";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.me);
  const { data, isLoading, isFetching } = useCheckMyAuthQuery();

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
              <Route
                path={"/login"}
                element={
                  data?.success || isAuthenticated ? (
                    <Navigate replace to="/" />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route path={"/register"} element={<Register />} />
              <Route
                path="/users"
                element={
                  <>
                    <Navbar />
                    <AllUsers />
                  </>
                }
              />
              <Route
                path="/users/:id"
                element={
                  <>
                    <Navbar />
                    <Profile />
                  </>
                }
              />

              <Route
                path="/projects"
                element={
                  <>
                    <Navbar />
                    <AllProjects />
                  </>
                }
              />

              <Route
                path="/projects/add"
                element={
                  data?.success || isAuthenticated ? (
                    <>
                      <Navbar />
                      <CreateProject />
                    </>
                  ) : (
                    <Navigate replace to="/login" />
                  )
                }
              />
            </Routes>
          </BrowserRouter>
          <Notification />
        </>
      )}
    </>
  );
};

export default App;
