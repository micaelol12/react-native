import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import Reactotron from "../ReactotronConfig";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  enhancers: [Reactotron.createEnhancer()],
});
export default store;
