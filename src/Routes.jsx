import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, RegisterCar } from "./module";
import PublicRoutes from "./config/navigationConfig/publicRoutes";
import ProtectedRoutes from "./config/navigationConfig/protectedRoutes";
import { Route, Routes } from "react-router-dom";

const Routess = () => {
  return (
    <Routes>
      <Route path="" element={<PublicRoutes />}>
        <Route path="/" element={<Login />} />
      </Route>
      <Route path="" element={<ProtectedRoutes />}>
        <Route path="/register_car" element={<RegisterCar />} />
      </Route>
    </Routes>
  );
};

export default Routess;
