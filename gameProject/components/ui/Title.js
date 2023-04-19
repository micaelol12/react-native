import { Text, StyleSheet } from "react-native";

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "white",
    padding: 12,
    fontFamily: 'open-sans-bold'
  },
});

export default Title;
