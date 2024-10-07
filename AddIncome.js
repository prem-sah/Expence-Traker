import { View, Text, TextInput, Button } from 'react-native';
import styles from "./styles";

export default function AddIncome({
  income = '', // Provide a default value for income
  setIncome,
  categories,
  setChartData,
  setExpenses,
  chartData = [], // Initialize chartData with an empty array as a default value
  expenses = [], // Initialize expenses with an empty array as a default value
}) {
  return (
    <View>
      <Text style={styles.label}>Add Daily Income</Text>
      <TextInput
        keyboardType="numeric"
        onChangeText={(value) => setIncome(value)}
        value={income ? income.toString() : ''} // Ensure income is a string
        style={styles.textInput}
        placeholder="Enter daily income"
      />
      <Button
          title="Add Income"
          onPress={() => {
            const incomeNumber = parseFloat(income);
            if (!isNaN(incomeNumber)) {
              if (chartData) { 
                // Add income to the chart data and update expenses
                const newChartData = [...chartData]; 
                newChartData.forEach((item) => {
                  item.amount += incomeNumber;
                });
                setChartData(newChartData);
                setExpenses([...expenses, { id: new Date().getTime(), category: 'Income', amount: incomeNumber }]);
                setIncome(''); // Reset income after adding
              } else {
                console.log("chartData is not defined");
              }
            } else {
              alert("Please enter a valid income");
            }
          }}
        />
    </View>
  );
}
