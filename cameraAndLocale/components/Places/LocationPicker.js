import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { getAddress, getMapPreview } from "../../util/location";
import { useEffect, useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const LocationPicker = ({ onPickLocation }) => {
  const [location, setLocation] = useState();

  const [locationPermission, requestPermission] = useForegroundPermissions();
  const navigation = useNavigation();
  const route = useRoute();

  const mapPickedLocation = useMemo(
    () =>
      route.params && {
        lat: route.params.latitude,
        lng: route.params.longitude,
      },
    [route.params]
  );

  useEffect(() => {
    if (mapPickedLocation) {
      setLocation(mapPickedLocation);
    }
  }, [mapPickedLocation]);

  const verifyPermissions = async () => {
    if (locationPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermission.status === PermissionStatus.DENIED) {
      if (locationPermission.canAskAgain) {
        const permissionResponse = await requestPermission();

        return permissionResponse.granted;
      }

      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const { coords } = await getCurrentPositionAsync();

    setLocation({
      lat: coords.latitude,
      lng: coords.longitude,
    });
  };

  useEffect(() => {
    const handleLocation = async () => {
      if (location) {
        const address = await getAddress(location.lat, location.lng);
        onPickLocation({ ...location, address });
      }
    };

    handleLocation();
  }, [location, onPickLocation]);

  let locationPreview = <Text>No location picked yet</Text>;

  if (location) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(location.lat, location.lng) }}
      ></Image>
    );
  }
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default LocationPicker;
