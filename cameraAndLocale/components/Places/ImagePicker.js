import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

const ImagePicker = ({ onTakeImage }) => {
  const [image, setImage] = useState();
  const [cameraPermissionInformation, requestPermisson] =
    useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermisson();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      if (cameraPermissionInformation.canAskAgain) {
        const permissionResponse = await requestPermisson();

        return permissionResponse.granted;
      }
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    const uri = image.assets[0].uri;
    
    setImage(uri);
    onTakeImage(uri);
  };

  let ImagePreview = <Text>No image taken yet.</Text>;

  if (image) {
    ImagePreview = <Image source={{ uri: image }} style={styles.image} />;
  }
  return (
    <View>
      <View style={styles.ImagePreview}>{ImagePreview}</View>
      <OutlinedButton onPress={takeImageHandler} icon="camera">
        Take Image
      </OutlinedButton>
    </View>
  );
};
export default ImagePicker;

const styles = StyleSheet.create({
  ImagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
