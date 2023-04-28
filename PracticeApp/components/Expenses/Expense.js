import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../contants/styles";
import { FormatDate } from "../../utils/DateFormater";
import { useNavigation } from "@react-navigation/native";

const Expense = ({ title, date, value,id }) => {
  const navigation = useNavigation();

  const expensePressHandler = () => {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  };

  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={expensePressHandler}
    >
      <View style={styles.expenseItem}>
        <View style={styles.expenseContainer}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>{FormatDate(new Date(date))}</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{value}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary500,
    marginBottom: 15,
    borderRadius: 5,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  expenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    color: GlobalStyles.colors.primary50,
    marginBottom: 3,
  },
  date: {
    color: GlobalStyles.colors.primary50,
  },
  valueContainer: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    minWidth: 80,
  },
  value: {
    color: GlobalStyles.colors.primary400,
    fontWeight: "bold",
  },
});

export default Expense;
