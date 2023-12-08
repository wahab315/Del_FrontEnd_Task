import React, { useEffect } from "react";
import Routes from "./Routes";
import store from "./store";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AuthController, { useAuth } from "./controllers/authController";

const App = () => {
  const { user } = useAuth();
  !user && AuthController.restorePersistedCredentials();
  useEffect(() => {}, []);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        style={{ zIndex: 99999999999999999999999999 }}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // className={"!capitalize"}
      />
      <Routes />
    </>
  );
};

export default App;
