import { createSlice } from "@reduxjs/toolkit";

const EXPENSE_INITAL_STATE = [
  {
    id: "e1",
    title: "A pair of shoes",
    date: "2023-04-28",
    value: 55.99,
  },
  {
    id: "e2",
    title: "A pair of trousers",
    date: "2023-04-22",
    value: 89.29,
  },
  {
    id: "e3",
    title: "Some bananas",
    date: "2023-03-10",
    value: 5.99,
  },
  {
    id: "e4",
    title: "A book",
    date: "2023-02-19",
    value: 14.99,
  },
  {
    id: "e5",
    title: "Another book",
    date: "2023-02-18",
    value: 18.59,
  },
];

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: EXPENSE_INITAL_STATE,
  },
  reducers: {
    addExpense: (state, action) => {
      const id = new Date().toString() + Math.random().toString();
      state.expenses.push({ ...action.payload, id });
    },
    removeExpense: (state, action) => {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload
      );
      console.log(index);
      state.expenses.splice(index, 1);
    },
    updateExpense: (state, action) => {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatedExpense = { ...state.expenses[index], ...action.payload.expense }
      console.log(updatedExpense)
      state.expenses[index] = updatedExpense;
    },
  },
});

export const expenseAction = expenseSlice.actions;
export default expenseSlice.reducer;
