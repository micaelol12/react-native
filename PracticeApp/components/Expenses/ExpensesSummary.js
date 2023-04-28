import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../contants/styles";

const ExpensesSummary = ({description,expenses}) => {
  const value = expenses?.reduce((accumulator, expense) => {
    return Number(accumulator) + Number(expense.value);
  }, 0);

  return (
    <View style={styles.container} >
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.value}>${value?.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding:10,
    borderRadius: 8,
    marginBottom:10,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  description: {
    color: GlobalStyles.colors.primary400
  },
  value: {
    color:  GlobalStyles.colors.primary700,
    fontWeight: 'bold',
    fontSize:15
  }
})
export default ExpensesSummary;
