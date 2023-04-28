import { useSelector } from "react-redux";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";

const AllExpenses = () => {
  const expenses = useSelector((state) => state.expenses.expenses);

  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expenses}
      fallbackText="No registered expenses found!"
    />
  );
};

export default AllExpenses;
