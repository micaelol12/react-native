import { FlatList, StyleSheet,View } from "react-native";
import MealItem from "./MealItem";

const MealsList = ({meals}) => {
  const renderMeal = (itemData) => {
    const mealItemProps = {
      id: itemData.item.id,
      title: itemData.item.title,
      imageUrl: itemData.item.imageUrl,
      complexity: itemData.item.complexity,
      title: itemData.item.title,
      duration: itemData.item.duration,
      affordability: itemData.item.affordability,
    };
    return <MealItem {...mealItemProps} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={(meal) => meal.id}
        renderItem={renderMeal}
      />
    </View>
  );
};

export default MealsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
