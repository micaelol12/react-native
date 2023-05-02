import axios from "axios";

const url = "https://react-native-course-8873c-default-rtdb.firebaseio.com/";

export const storeExpense = async (expenseData) => {
  return axios.post(url + "expenses.json", expenseData);
};

export const fetchExpenses = async () => {
  return axios.get(url + "expenses.json");
};

export const getExpenses = async () => {
  const response = await fetchExpenses();
  const data = response.data

  const expenses =  Object.keys(data).map((key)=> {
    const expense = data[key];
    return {
      id: key,
      date: expense.date,
      title: expense.title,
      value: expense.value
    }
  })
 
  return expenses;
}

export const updateExpense  = async (id,expenseData) => {
  return axios.put(url  + `expenses/${id}.json`, expenseData)
}

export const deleteExpense = (id) => {
  return axios.delete(url  + `expenses/${id}.json`)

}