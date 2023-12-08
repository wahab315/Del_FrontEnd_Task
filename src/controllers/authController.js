import { apiClient } from "../config/api.config";
import { setSession, setUser, userLoggedOut } from "../store/slices/authSlice";
import store from "../store/index";
import { useSelector } from "react-redux";
import ToastController from "./ToastController";
import { useLocation, useNavigate } from "react-router-dom";

class AuthController {
  static loginUser(data) {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/api/user/login", data)
        .then((res) => {
          if (res?.data?.status === "success") {
            resolve(res?.data);
          } else {
            reject(res?.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static persistCredentials = (session) => {
    if (!!session) {
      // session?.user && MySocketController.init();
      store.dispatch(setSession(session));
      store.dispatch(setUser(session));
      apiClient.defaults.headers.common["Authorization"] = session?.token;
      localStorage?.setItem("test.v.0.1", JSON.stringify(session));
    }
  };
  static getPersistedCredentials = () => {
    let strSessionData = localStorage?.getItem("test.v.0.1");
    if (strSessionData) {
      return JSON.parse(strSessionData);
    } else {
      return null;
    }
  };

  static restorePersistedCredentials() {
    let persistedData = AuthController.getPersistedCredentials();

    if (persistedData) {
      store.dispatch(setSession(persistedData));
      apiClient.defaults.headers.common["Authorization"] = persistedData?.token;
      return persistedData?.user;
    } else {
      return false;
    }
  }

  static async logout() {
    const user = store.getState().Auth.session?.user;
    // const firebaseToken = store.getState().Notification.fireBaseToken;
    try {
      // ToastController.info("Logging Out!");
      await store.dispatch(userLoggedOut());

      ToastController.info("Logged Out Successfully!");
      localStorage?.removeItem("test.v.0.1");
      store.dispatch(setSession(null));
      apiClient.defaults.headers.common["Authorization"] = undefined;
    } catch (error) {
      store.dispatch(setSession(null));
      localStorage?.removeItem("test.v.0.1");
      store.dispatch(userLoggedOut());
      apiClient.defaults.headers.common["Authorization"] = undefined;

      ToastController.info("Network Error!");
    }
  }
}

export default AuthController;

export const useAuth = () => {
  const session = useSelector((state) => state.Auth.session);

  return {
    user: session?.data?.user,
    token: session?.token,
    authenticated: session?.token && session?.data?.user ? true : false,
    session,
  };
};
