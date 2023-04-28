import { configureStore } from "@reduxjs/toolkit";
import expensesSlice from "./slices/expenses-slice";

const store = configureStore({
  reducer: {
    expenses: expensesSlice,
  },
});

export default store;
