import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../contants/styles";
import { FormatDate } from "../../utils/DateFormater";

const Expense = ({ title, date, value }) => {
  return (
    <View style={styles.expenseItem}>
      <Pressable>
        <View style={styles.expenseContainer}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>{FormatDate(date)}</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{value}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  expenseItem: {
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary500,
    marginBottom: 15,
    borderRadius: 5,
  },
  expenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  title: {
    fontWeight: "bold",
    color: "white",
    marginBottom: 3,
  },
  date: {
    color: "white",
  },
  valueContainer: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  value: {
    color: GlobalStyles.colors.primary400,
    fontWeight: "bold",
  },
});

export default Expense;
