import { useContext } from "react";
import { FavoritesContext } from "../store/context/favorites-context";
import MealsList from "../components/MealsList/MealsList";
import { MEALS } from "../data/dummy-data";
import { View } from "react-native";

const FavoritesScreen = () => {
  const { ids } = useContext(FavoritesContext);
  const favoriteMeals = MEALS.filter(
    (meal) => ids.includes(meal.id)
  );

  if(favoriteMeals.length === 0){
    return <View>
      <Text></Text>
    </View>
  }

  return <MealsList meals={favoriteMeals} />;
};

export default FavoritesScreen;
