import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [goalInput, setGoalInput] = useState();
  const [goals, setGoals] = useState([]);

  const handleChange = (v) => setGoalInput(v);
  const handlePress = () => {
    if (!goalInput) return;
    setGoals((goals) => [
      ...goals,
      { text: goalInput, id: Math.random().toString() },
    ]);
    setGoalInput("");
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={handleChange}
          value={goalInput}
          placeholder="Your course goal!"
        ></TextInput>
        <Button title="Add Goal" color="#933df5" onPress={handlePress}></Button>
      </View>
      <View style={styles.goalsContainer}>
        <FlatList
          data={goals}
          keyExtractor={(item, index) => item.id}
          renderItem={(itemData) => <GoalItem />}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 4,
  },
});
