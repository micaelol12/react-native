import { useRef, useState } from "react";
import IconButton from "./IconButton";
import { Animated, StyleSheet } from "react-native";

const FavoriteButton = ({ onPress }) => {
  const [liked, setLiked] = useState(false);
  const outline = useRef(new Animated.Value(1)).current;
  const filled = useRef(new Animated.Value(0)).current;

  const pressHandler = () => {
    onPress();
    Animated.spring(!liked ? filled : outline, {
      toValue: 1,
      bounciness: 20,
      useNativeDriver: true,
    }).start();
    Animated.spring(!liked ? outline : filled, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setLiked((v) => !v);
  };

  return (
    <>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { transform: [{ scale: outline }] },
        ]}
      >
        <IconButton onPress={pressHandler} color="red" icon="heart-outline" />
      </Animated.View>
      <Animated.View style={[{ transform: [{ scale: filled }] }]}>
        <IconButton onPress={pressHandler} color="red" icon="heart" />
      </Animated.View>
    </>
  );
};

export default FavoriteButton;
