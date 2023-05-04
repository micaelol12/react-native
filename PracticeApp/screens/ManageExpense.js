import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { GlobalStyles } from "../contants/styles";
import { expenseAction } from "../store/slices/expenses-slice";
import IconButton from "../components/ui/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import { useCallback } from "react";
import { useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const ManageExpense = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState();

  const expenses = useSelector((state) => state.expenses.expenses);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const dispatch = useDispatch();

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = useCallback(async () => {
    setIsLoading(true)
    try {
      await deleteExpense(editedExpenseId);
      dispatch(expenseAction.removeExpense(editedExpenseId));
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense - please try again later!')
    }
    setIsLoading(false)
  }, [])

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setIsLoading(true)
    try {
      if (isEditing) {
        await updateExpense(editedExpenseId, expenseData);
        dispatch(
          expenseAction.updateExpense({
            expense: expenseData,
            id: editedExpenseId,
          })
        );
      } else {
        const response = await storeExpense(expenseData)
        const ExpenseId = response.data.name

        dispatch(expenseAction.addExpense({ ...expenseData, id: ExpenseId }));
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data - please try again later')
    }
    setIsLoading(false)
  };

  const errorHandler = () => setError(null)

  if (isLoading) return <LoadingOverlay />

  if (error && !isLoading) return <ErrorOverlay message={error} onConfirm={errorHandler} />
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          ></IconButton>
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
