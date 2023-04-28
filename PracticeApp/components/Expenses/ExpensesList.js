import { FlatList } from "react-native";
import Expense from "./Expense";

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(expenses) => expenses.id}
      renderItem={({ item }) => (
        <Expense
          date={item.date}
          title={item.title}
          value={item.value}
          id={item.id}
        />
      )}
    />
  );
};

export default ExpensesList;
