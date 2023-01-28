import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCheckMyAuthQuery } from "./app/services/userApi";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Notification } from "./components/Notification";
import AllProjects from "./pages/AllProjects";
import AllUsers from "./pages/AllUsers";
import { CreateProject } from "./pages/CreateProject";
import EditProject from "./pages/EditProject";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Project from "./pages/Project";
import Register from "./pages/Register";
import { LoadingWrapper } from "./styles/pages/profileStyles";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.me);
  const { data, isLoading, error, isFetching } = useCheckMyAuthQuery();
  const [blankLoader, setBlankLoader] = useState(true);
  useEffect(() => {
    if (isFetching) {
      setBlankLoader(true);
    } else if (
      !isFetching &&
      (data?.success === true || error?.data?.success === false)
    ) {
      setTimeout(() => {
        setBlankLoader(false);
      }, 1000);
    }
  }, [isFetching]);

  return (
    <>
      {isLoading || isFetching || blankLoader ? (
        <LoadingWrapper allWeb>Loading...</LoadingWrapper>
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
                    <Footer />
                  </>
                }
              />
              <Route
                path="/users/:id"
                element={
                  <>
                    <Navbar />
                    <Profile />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/projects"
                element={
                  <>
                    <Navbar />
                    <AllProjects />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/projects/:id"
                element={
                  <>
                    <Navbar />
                    <Project />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/projects/:id/edit"
                element={
                  <>
                    <Navbar />
                    <EditProject />
                    <Footer />
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
                      <Footer />
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
