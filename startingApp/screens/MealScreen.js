import { useContext, useLayoutEffect } from "react";
import { MEALS } from "../data/dummy-data";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import FavoriteButton from "../components/favoriteButton";
// import { FavoritesContext } from "../store/context/favorites-context";
import { useDispatch, useSelector } from "react-redux";
import { FavoritesActions } from "../store/redux/favorites";
const MealScreen = ({ route, navigation }) => {
  // const { addFavorite, removeFavorite,ids } = useContext(FavoritesContext);
  const ids = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((m) => m.id == mealId);
  const isFavorite = ids.includes(mealId);

  const headerButtonPressHandler = () => {
    if (isFavorite) {
      dispatch(FavoritesActions.removeFavorite({ id: selectedMeal.id }));
      // removeFavorite(selectedMeal.id)
    } else {
      dispatch(FavoritesActions.addFavorite({ id: selectedMeal.id }));
      // addFavorite(selectedMeal.id)
    }
  };

  useLayoutEffect(() => {
    const mealTitle = selectedMeal.title;
    navigation.setOptions({
      title: mealTitle,
      headerRight: () => {
        return (
          <FavoriteButton
            onPress={headerButtonPressHandler}
            value={isFavorite}
          />
        );
      },
    });
  }, [mealId, navigation, selectedMeal, headerButtonPressHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image
        source={{ uri: selectedMeal.imageUrl }}
        style={styles.image}
      ></Image>
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        itemStyle={styles.details}
        affordability={selectedMeal.affordability}
        complexity={selectedMeal.complexity}
        duration={selectedMeal.duration}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients}></List>
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps}></List>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  details: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
export default MealScreen;
