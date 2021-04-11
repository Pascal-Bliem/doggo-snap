import React from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

// This image picker component allows the user to get an image
// either from the camera or the media library. The URI of the
// picked image is the forwarded to the onImageTaken prop function.

export interface ImgPickerProps {
  onImageTaken: (uri: string, base64?: string) => void;
}

const ImgPicker = ({ onImageTaken }: ImgPickerProps) => {
  // this functions asks the user for camera and media library permissions
  const verifyPermissions = async (): Promise<boolean> => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.MEDIA_LIBRARY
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permission!",
        "You need to grant camera and media library permissions to use this app. If you have declined the permissions earlier, we cannot ask you for permission again within the app. You'll have to go to your phones app settings and grant the permissions manually.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  // this function handles a press on the image picker options
  // "camera" or "library"
  const takeImageHandler = async (
    source: "camera" | "library"
  ): Promise<void> => {
    // check permissions first
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const imgOptions: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    };
    // pick the image
    let image: ImagePicker.ImagePickerResult;
    if (source === "camera") {
      image = await ImagePicker.launchCameraAsync(imgOptions);
    } else {
      image = await ImagePicker.launchImageLibraryAsync(imgOptions);
    }
    // if not cancelled, forward the image's URI
    if (!image.cancelled) {
      onImageTaken(image.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Classify a Dog Breed </Text>
      <View style={styles.imagePicker}>
        {/* Touchable for taking camera image */}

        <TouchableOpacity onPress={() => takeImageHandler("camera")}>
          <View style={styles.action}>
            <Ionicons
              name={Platform.OS === "android" ? "md-camera" : "ios-camera"}
              size={64}
              color={Colors.primary}
            />
            <Text>Take new Image</Text>
          </View>
        </TouchableOpacity>

        {/* Touchable for picking library image */}

        <TouchableOpacity onPress={() => takeImageHandler("library")}>
          <View style={styles.action}>
            <Ionicons
              name={
                Platform.OS === "android" ? "md-folder-open" : "ios-folder-open"
              }
              size={64}
              color={Colors.ternary}
            />
            <Text>Pick from Library</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  imagePicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  action: {
    justifyContent: "center",
    alignItems: "center",
    margin: ((Dimensions.get("window").width * 0.9) / 2) * 0.05,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    maxWidth:
      (Dimensions.get("window").width * 0.9) / 2 -
      ((Dimensions.get("window").width * 0.9) / 2) * 0.05,
  },
});

export default ImgPicker;
