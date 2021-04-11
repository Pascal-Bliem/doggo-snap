import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Touchable,
  Dimensions,
} from "react-native";
import Colors from "../constants/colors";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { FontAwesome5 } from "@expo/vector-icons";
import MapPreview from "./MapPreview";
import { NavigationScreenProp } from "react-navigation";

export interface LocationPickerProps {
  navigation: NavigationScreenProp<any, any>;
  onLocationPicked: any;
}

export interface LocationType {
  latitude: number;
  longitude: number;
}

const LocationPicker = ({
  navigation,
  onLocationPicked,
}: LocationPickerProps) => {
  const [pickedLocation, setPickedLocation] = useState<LocationType>();
  const [isFetching, setIsFetching] = useState(false);

  const mapPickedLocation = navigation.getParam("pickedLocation");

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permission!",
        "You need to grant location permissions to use this app. If you have declined the permissions earlier, we cannot ask you for permission again within the app. You'll have to go to your phones app settings and grant camera permissions manually.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync();
      setPickedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      onLocationPicked({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or manually pick location on map",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        location={pickedLocation}
        onPress={pickOnMapHandler}
        style={styles.mapPreview}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <FontAwesome5 name="map-marker-alt" size={45} />
        )}
      </MapPreview>
      <View style={styles.actions}>
        <TouchableOpacity onPress={getLocationHandler} style={styles.button}>
          <Text style={styles.buttonText}>Get current Location</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickOnMapHandler} style={styles.button}>
          <Text style={styles.buttonText}>Pick on Map</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    width: Dimensions.get("window").width * 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.primary,
    alignSelf: "center",
    textAlign: "center",
  },
});

export default LocationPicker;
