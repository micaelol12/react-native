import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import PrimaryButton from "../components/ui/PrimaryButtton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import SuccesImage from "../assets/success.png";

const GameOverScreen = ({ rounds, number, onStartNewGame }) => {
  const { width, height } = useWindowDimensions();

  const isWide = width > 500;

  return (
    <View style={[styles.rootContainer, isWide && styles.rootContainerWide]}>
      <View style={[styles.gameOverContainer,isWide && styles.gameOverContainerWide]}>
        <Title>GAME OVER!</Title>
        <View
          style={[styles.imageContainer, isWide && styles.imageContainerWide]}
        >
          <Image source={SuccesImage} style={styles.Image}></Image>
        </View>
      </View>
      <View style={[ styles.contentContainer,isWide && styles.contentContainerWide]}>
        <Text style={[styles.summaryText, isWide && styles.summaryTextWide]}>
          Your phone need <Text style={styles.highLight}>{rounds}</Text> rounds
          to guess the number <Text style={styles.highLight}>{number}</Text>
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </View>
  );
};

export default GameOverScreen;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  rootContainerWide: {
    flexDirection: "row",
  },
  imageContainer: {
    width: deviceWidth < 380 ? "80%" : "100%",
    aspectRatio: 1,
    borderRadius: deviceWidth / 2,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  imageContainerWide: {
    width: "55%",
  },
  Image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  contentContainer:{
    flex:1
  },
  contentContainerWide: {
    flexDirection: "column",
    flex: 2,
  },
  gameOverContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  gameOverContainerWide: {
    flex: 1.8,
  },
  highLight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
