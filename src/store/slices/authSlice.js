import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  session: null,
  //  {
  //   name: "Jeo",
  //   picture: "/Assets/Images/profile.png",
  // },
};

export const AuthSlice = createSlice({
  name: "AuthSlice",
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
