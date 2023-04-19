import { Image, StyleSheet, Text, View } from "react-native";

import PrimaryButton from "../components/ui/PrimaryButtton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import SuccesImage from "../assets/success.png";

const GameOverScreen = ({rounds,number,onStartNewGame}) => {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image source={SuccesImage} style={styles.Image}></Image>
      </View>
      <Text style={styles.summaryText}>
        Your phone need <Text style={styles.highLight}>{rounds}</Text> rounds to guess
        the number <Text style={styles.highLight}>{number}</Text>
      </Text>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  Image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24
  },
  highLight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
