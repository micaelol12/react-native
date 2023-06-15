import AsyncStorage from "@react-native-async-storage/async-storage";
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
      const token = action.payload

      AsyncStorage.setItem('token',token);
      
      return state = {
        token: token,
        isAuthenticated: true,
      };
    },
    logout: (state) => {
    AsyncStorage.removeItem('token');
     return  state = {
        token: "",
        isAuthenticated: false,
      };
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
