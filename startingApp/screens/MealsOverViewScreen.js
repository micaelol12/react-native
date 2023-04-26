import { CATEGORIES, MEALS } from "../data/dummy-data";
import { useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";

const MealsOverviewScreen = ({ route, navigation }) => {
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  useLayoutEffect(()=> {
    const categoryTitle = CATEGORIES.find((c) => c.id == catId).title;
    navigation.setOptions({
      title: categoryTitle
    });
  },[catId,navigation])

  return (
    <MealsList meals={displayedMeals}/>
  );
};


export default MealsOverviewScreen;
