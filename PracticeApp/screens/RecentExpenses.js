import { useDispatch, useSelector } from "react-redux";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { getDateMinusDays } from "../utils/DateFormater";
import { useCallback, useEffect, useState } from "react";
import { getExpenses } from "../utils/http";
import { expenseAction } from "../store/slices/expenses-slice";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const RecentExpenses = () => {

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState();

  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch()

  const getExp = useCallback(async () => {
    setIsLoading(true)
    try {
      const expenses = await getExpenses()
      dispatch(expenseAction.setExpenses(expenses))
    } catch (error) {
      setError('Could not fetch expenses!')
    }
    setIsLoading(false)

  }, [])

  useEffect(() => {
    getExp();
  }, [])

  const errorHandler = () => setError(null)

  if (isLoading) return <LoadingOverlay />

  if (error && !isLoading) return <ErrorOverlay message={error} onConfirm={errorHandler} />

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
