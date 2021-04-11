import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import MapView, { Marker, MapEvent, Region } from "react-native-maps";
import Colors from "../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import Card from "../components/Card";

export interface MapScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const MapScreen = ({ navigation }: MapScreenProps) => {
  const initialLocation = navigation.getParam("initialLocation");
  const readonly = navigation.getParam("readonly");
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = useRef({
    latitude: initialLocation ? initialLocation.latitude : 51.16,
    longitude: initialLocation ? initialLocation.longitude : 10.45,
    latitudeDelta: 12,
    longitudeDelta: 6,
  });

  const regionChangeHandler = (newRegion: Region) => {
    mapRegion.current = newRegion;
  };

  const selectLocationHandler = (event: MapEvent) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked.",
        "Please pick location on the map before saving it.",
        [{ text: "Okay" }]
      );
      return;
    }
    navigation.navigate("AddDog", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  return (
    <View style={styles.screen}>
      <MapView
        region={mapRegion.current}
        style={{ ...styles.map, ...{ height: readonly ? "100%" : "90%" } }}
        onPress={selectLocationHandler}
        onRegionChangeComplete={regionChangeHandler}
      >
        {markerCoordinates && (
          <Marker
            title="Picked Location"
            coordinate={markerCoordinates}
          ></Marker>
        )}
      </MapView>
      {!readonly && (
        <Card style={styles.saveButtonContainer}>
          <TouchableOpacity
            onPress={savePickedLocationHandler}
            style={styles.saveButton}
          >
            <FontAwesome5 name="save" size={25} style={styles.icons} />
            <Text style={styles.saveButtonText}>Save picked Location</Text>
          </TouchableOpacity>
        </Card>
      )}
    </View>
  );
};

MapScreen.navigationOptions = {
  headerTitle: "",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  saveButtonContainer: {
    marginVertical: 20,
    height: "5%",
    marginBottom: 50,
  },
  saveButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  saveButtonText: {
    fontSize: 16,
    marginLeft: 10,
    color: Colors.primary,
  },
  icons: {},
});

export default MapScreen;
