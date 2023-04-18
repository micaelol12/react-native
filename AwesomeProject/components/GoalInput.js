import { useState } from "react";
import { Button, Modal } from "react-native";
import { StyleSheet, TextInput, View, Image } from "react-native";
import GoalImg from "../assets/goal.png";

const GoalInput = (props) => {
  const [goalInput, setGoalInput] = useState();

  const handleChange = (v) => setGoalInput(v);

  const handlePress = () => {
    if (!goalInput) return;
    props.onPress(goalInput);
    setGoalInput("");
  };

  return (
    <Modal visible={props.visible} animationType="slide" hei>
      <View style={styles.inputContainer}>
        <Image source={GoalImg} style={styles.image}></Image>
        <TextInput
          style={styles.textInput}
          onChangeText={handleChange}
          value={goalInput}
          placeholder="Your course goal!"
        ></TextInput>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Add Goal"
              color="#b180f0"
              onPress={handlePress}
            ></Button>
          </View>
          <View style={styles.button}>
            <Button
              title="Cancel"
              onPress={props.onCancel}
              color="#f31282"
            ></Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "100%",
    padding: 8,
    backgroundColor: "#e4d0ff",
    borderColor: "#e4d0ff",
    borderRadius: 6,
    color: "#120438",
    padding: 16
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
});

export default GoalInput;
