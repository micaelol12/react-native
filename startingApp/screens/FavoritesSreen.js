import { useContext } from "react";
import { FavoritesContext } from "../store/context/favorites-context";
import MealsList from "../components/MealsList/MealsList";
import { MEALS } from "../data/dummy-data";

const FavoritesScreen = () => {
  const { ids } = useContext(FavoritesContext);
  const displayedMeals = MEALS.filter(
    (meal) => ids.includes(meal.id)
  );

  return <MealsList meals={displayedMeals} />;
};

export default FavoritesScreen;
