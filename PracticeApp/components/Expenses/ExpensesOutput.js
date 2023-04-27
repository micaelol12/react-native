import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const ExpensesOutput = ({ expenses,expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary description={expensesPeriod} expenses={expenses} />
      <ExpensesList expenses={expenses} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20
  }
}
)
export default ExpensesOutput;
