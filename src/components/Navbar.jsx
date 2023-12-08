import React from "react";
import Button from "./Button";
import AuthController from "../controllers/authController";

const Navbar = () => {
  const handleLogOut = () => {
    const res = AuthController.logout();
  };
  return (
    <div className="navbar">
      <Button onClick={() => handleLogOut()}>Sign out</Button>
    </div>
  );
};

export default Navbar;
