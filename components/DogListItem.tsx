import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Card from "./Card";
import dogData from "../data/dogData";
import { Breeds } from "../models/dog";

export interface DogListItemProps {
  id: string;
  imageUri: string;
  name: string;
  breed?: Breeds;
  address?: string;
  onPress?: (id: string) => void;
}

const DogListItem = ({
  id,
  imageUri,
  name,
  breed,
  address,
  onPress,
}: DogListItemProps) => {
  return (
    <Card style={styles.card}>
      <TouchableOpacity
        style={styles.container}
        disabled={onPress ? false : true}
      >
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          {breed && (
            <View style={styles.textLine}>
              <FontAwesome5 name="dog" size={iconSize} style={styles.icon} />
              <Text style={styles.breedAndAddress}>
                {dogData[breed]["name"]}
              </Text>
            </View>
          )}
          {address && (
            <View style={styles.textLine}>
              <FontAwesome5
                name="map-marker-alt"
                size={iconSize}
                style={styles.icon}
              />
              <Text style={styles.breedAndAddress}>{address.trim()}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const iconSize = 14;

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width * 0.9,
    marginTop: 20,
  },
  container: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").width * 0.3,
    margin: 10,
    marginRight: Dimensions.get("window").width * 0.07,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  textLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Dimensions.get("window").height * 0.01,
  },
  icon: {
    marginRight: 10,
  },
  breedAndAddress: {
    flex: 1,
    color: "#6a6a6a",
    fontStyle: "italic",
  },
});

export default DogListItem;
