import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar as SB,
} from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import OpenSans from "./assets/fonts/OpenSans-Regular.ttf";
import OpenSansBold from "./assets/fonts/OpenSans-Bold.ttf";

import StartGameScreen from "./screens/StartGameScreen";
import BackgroundImg from "./assets/background.png";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [rounds, setRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": OpenSans,
    "open-sans-bold": OpenSansBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }


  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGameIsOver(true);
    setRounds(numberOfRounds)
  };

  const newGameHandler = () => {
    setUserNumber(null)
    setRounds(0)
  }

  const hasPickedNumber = !!userNumber;

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (hasPickedNumber) {
    screen = (
      <GameScreen
        userNumber={userNumber}
        onGameOver={gameOverHandler}
      />
    );
  }

  if (gameIsOver && hasPickedNumber) {
    screen = <GameOverScreen number={userNumber} rounds={rounds} onStartNewGame={newGameHandler} />;
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        style={styles.rootScreen}
        colors={[Colors.primary700, Colors.accent500]}
      >
        <ImageBackground
          source={BackgroundImg}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={[styles.rootScreen, styles.saveArea]}>
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  saveArea: {
    paddingTop: SB.currentHeight,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
