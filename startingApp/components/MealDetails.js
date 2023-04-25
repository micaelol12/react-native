import { StyleSheet, Text, View } from "react-native";

const MealDetails = ({duration,complexity,affordability,itemStyle}) => {
  return (
    <View style={[styles.details]}>
      <Text style={[styles.detailItem,itemStyle]}>{duration}m</Text>
      <Text style={[styles.detailItem,itemStyle]}>{complexity.toUpperCase()}</Text>
      <Text style={[styles.detailItem,itemStyle]}>{affordability.toUpperCase()}</Text>
    </View>
  );
  
};
const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
export default MealDetails;
