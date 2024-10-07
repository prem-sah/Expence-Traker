import { Alert, Button, ScrollView, Text, View } from "react-native";
import styles from "./styles";

const calculateWeeklyIncomeAndExpense = (expenses) => {
    const weeklyIncome = expenses.reduce((acc, curr) => {
      if (curr.category === 'Income') {
        acc += curr.amount;
      }
      return acc;
    }, 0);
  
    const weeklyExpense = expenses.reduce((acc, curr) => {
      if (curr.category !== 'Income') {
        acc += curr.amount;
      }
      return acc;
    }, 0);
  
    return { weeklyIncome, weeklyExpense };
  };

export default function ExpenseComponent({
    expenses,
    setExpenses,
    chartData,
    setChartData,
}) {
    const { weeklyIncome, weeklyExpense } = calculateWeeklyIncomeAndExpense(expenses);

    return (
        <ScrollView
            style={{
                marginBottom: 80,
            }}
        >
            {expenses.map((expense) => {
                console.log(expense);
                return (
                    <ExpenseListTile
                        key={expense.id}
                        expense={expense}
                        chartData={chartData}
                        expenses={expenses}
                        setChartData={setChartData}
                        setExpenses={setExpenses}
                    />
                );
            })}
            <View style={styles.weeklySummary}>
                <Text style={styles.weeklySummaryText}>
                    Weekly Income: {weeklyIncome}
                </Text>
                <Text style={styles.weeklySummaryText}>
                    Weekly Expense: {weeklyExpense}
                </Text>
            </View>
        </ScrollView>
    );
}
const ExpenseListTile = ({
    expense,
    expenses,
    setExpenses,
    chartData,
    setChartData,
}) => {
    return (
        <View style={styles.expenseTile}>
            <Text style={styles.expenseTileText}>{expense.name}</Text>
            <Text style={styles.expenseTileText}>{expense.category}</Text>
            <Text style={styles.expenseTileText}>{expense.amount}</Text>
            <Button
                onPress={() => {
                    Alert.alert("Delete", "Are you sure you want to delete?", [
                        {
                            text: "Yes",
                            onPress: () => {
                                let newExpenses = [...expenses];
                                let index = newExpenses.findIndex(
                                    (item) => item.id == expense.id
                                );
                                newExpenses.splice(index, 1);
                                setExpenses(newExpenses);
                                let newChartData = [...chartData];
                                let index2 = newChartData.findIndex(
                                    (item) => item.name == expense.category
                                );
                                newChartData[index2].amount -= expense.amount;
                                setChartData(newChartData);
                            },
                        },
                        {
                            text: "No",
                            onPress: () => {
                                console.log("No");
                            },
                        },
                    ]);
                }}
                title="Delete"
            />
        </View>
    );
};