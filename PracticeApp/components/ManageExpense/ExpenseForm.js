import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";
import { GlobalStyles } from "../../contants/styles";

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState({
    value: {
      value: defaultValues ? defaultValues.value.toString() : "0",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date : "",
      isValid: true,
    },
    title: {
      value: defaultValues ? defaultValues.title : "",
      isValid: true,
    },
  });

  const inputChangedhandler = (inputIdentifier, enteredValue) => {
    setInputs((currentInputs) => ({
      ...currentInputs,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  };

  const confirmHandler = () => {
    const expenseData = {
      value: +inputs.value.value,
      date: inputs.date.value,
      title: inputs.title.value,
    };

    const valueIsValid = !isNaN(expenseData.value) && expenseData.value > 0;

    const dateIsvalid =
      new Date(expenseData.date).toString() !== "Invalid Date";

    const titleIsValid = expenseData.title.trim().length > 0;

    if (!valueIsValid || !dateIsvalid || !titleIsValid) {
      // Alert.alert("Invalid input", "Please check your input values");
      setInputs((currentInputs) => ({
        date: { value: currentInputs.date.value, isValid: dateIsvalid },
        title: { value: currentInputs.title.value, isValid: titleIsValid },
        value: { value: currentInputs.value.value, isValid: valueIsValid },
      }));
      return;
    }

    onSubmit(expenseData);
  };

  const invalidForm =
    !inputs.value.isValid || !inputs.date.isValid || !inputs.title.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          invalid={!inputs.value.isValid}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedhandler.bind(this, "value"),
            value: inputs.value.value,
          }}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedhandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.title.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedhandler.bind(this, "title"),
          value: inputs.title.value,
        }}
      />
      {invalidForm && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode="flat" style={styles.button} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
export default ExpenseForm;
