import React, { useCallback, useLayoutEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Alert, StyleSheet, View } from "react-native";

import IconButton from "../components/UI/IconButton";

const Map = ({ navigation, route }) => {
  const initalLocation = route.params && {
    latitude: route.params.initialLat,
    longitude: route.params.initialLng,
  };

  console.log(initalLocation)
  const [selectedLocation, setSelectedLocation] = useState(initalLocation);

  const region = {
    latitude: initalLocation ? initalLocation.latitude : 37.78,
    longitude: initalLocation ? initalLocation.longitude : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ latitude, longitude });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (by tappiing on the map) first!"
      );
      return;
    }

    navigation.navigate("AddPlace", selectedLocation);
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initalLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          color={tintColor}
          icon="save"
          size={24}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler,initalLocation]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="Picked Location" />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
