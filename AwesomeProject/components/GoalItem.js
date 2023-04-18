import { StyleSheet, View, Text, Pressable } from "react-native";

const GoalItem = (props) => {
  const handlePress = () => {
    props.onPress(props.id);
  };

  return (
    <View style={styles.goalItem}>
      <Pressable
        onPress={handlePress}
        android_ripple={{ color: "#dddddd" }}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    padding: 8,
    color: "white",
  },
});
