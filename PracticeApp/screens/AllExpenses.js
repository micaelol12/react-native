import ExpensesOutput from "../components/Expenses/ExpensesOutput"

const Expenses = [
  {
    id: 'e1',
    title: 'A pair of shoes',
    date: new Date('2021-12-19'),
    value: 55.99
  },
  {
    id: 'e2',
    title: 'A pair of trousers',
    date: new Date('2022-01-5'),
    value: 89.29
  }
]

const AllExpenses = () => {
  return <ExpensesOutput expenses={Expenses} expensesPeriod="Last 7 days"/>
}

export default AllExpenses