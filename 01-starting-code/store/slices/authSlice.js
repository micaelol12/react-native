import { createSlice } from "@reduxjs/toolkit";

const AUTH_INITIAL_STATE = {
  token: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: AUTH_INITIAL_STATE,
  reducers: {
    authenticate: (state, action) => {
      return state = {
        token: action.payload,
        isAuthenticated: true,
      };
    },
    logout: (state) => {
     return  state = {
        token: "",
        isAuthenticated: false,
      };
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
