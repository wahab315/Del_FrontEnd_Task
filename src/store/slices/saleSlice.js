import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: null,
  session: null,
  //  {
  //   name: "Jeo",
  //   picture: "/Assets/Images/profile.png",
  // },
};

const registerSale = createAsyncThunk(
  "SaleSlice/registerSale",
  async (payload, { getState }) => {
    const { data } = await axios.post(
      `http://localhost:9013/api/sale`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${getState().Auth.currentUser.token}`,
        },
      }
    );

    return data;
  }
);

export const AuthSlice = createSlice({
  name: "SaleSlice",
  initialState,

  reducers: {
    setUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    setSession: (state, { payload }) => {
      state.session = payload;
    },
    userLoggedOut: () => initialState,
  },
});

export const { setUser, setSession, userLoggedOut } = AuthSlice.actions;
export default AuthSlice.reducer;
