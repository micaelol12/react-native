import { createSlice } from "@reduxjs/toolkit";

const EXPENSE_INITAL_STATE = [];

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: EXPENSE_INITAL_STATE,
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push({ ...action.payload });
    },
    removeExpense: (state, action) => {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload
      );
      state.expenses.splice(index, 1);
    },
    updateExpense: (state, action) => {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatedExpense = {
        ...state.expenses[index],
        ...action.payload.expense,
      };
      state.expenses[index] = updatedExpense;
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const expenseAction = expenseSlice.actions;
export default expenseSlice.reducer;
