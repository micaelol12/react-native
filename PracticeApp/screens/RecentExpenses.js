import { useDispatch, useSelector } from "react-redux";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { getDateMinusDays } from "../utils/DateFormater";
import { useEffect } from "react";
import { getExpenses } from "../utils/http";
import { expenseAction } from "../store/slices/expenses-slice";

const RecentExpenses = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch()

  const getExp = async () => {
    const expenses = await getExpenses()
    dispatch(expenseAction.setExpenses(expenses))
  }

  useEffect(() => {
    getExp();
  },[])

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    const expenseDate = new Date(expense.date);
    return expenseDate >= date7DaysAgo && expenseDate <= today;
  });

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last 7 days "
    />
  );
};

export default RecentExpenses;
