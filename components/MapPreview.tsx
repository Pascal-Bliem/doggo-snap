import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageStyle,
  ViewStyle,
  TextStyle,
} from "react-native";
import { LocationType } from "./LocationPicker";
import MapView, { Marker, MapEvent, LatLng } from "react-native-maps";

export interface MapPreviewProps {
  location: LocationType | undefined;
  style: ImageStyle | ViewStyle | TextStyle;
  onPress: () => void;
  children?: React.ReactNode;
}

const MapPreview = ({
  location,
  style,
  onPress,
  children,
}: MapPreviewProps) => {
  let mapRegion;
  let markerCoordinates;
  if (location) {
    mapRegion = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.03,
      longitudeDelta: 0.015,
    };

    markerCoordinates = {
      latitude: location.latitude,
      longitude: location.longitude,
    };
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...style, ...styles.mapPreview }}
    >
      {location ? (
        <MapView region={mapRegion} style={styles.mapImage}>
          <Marker
            title="Picked Location"
            //@ts-ignore
            coordinate={markerCoordinates}
          ></Marker>
        </MapView>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapImage: {
    width: "100%",
    height: "100%",
  },
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapPreview;
