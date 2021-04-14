//TODO: make this work for the classification screen, the all breeds details, and the your dogs details

import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import Card from "../components/Card";
import { FontAwesome5 } from "@expo/vector-icons";
import dogData from "../data/dogData";
import { Breeds } from "../models/dog";

export interface DogDetailsProps {
  imageUri?: string;
  name: string;
  certainty?: string;
  breed: Breeds;
  children?: React.ReactNode;
}

const DogDetails = ({
  imageUri,
  name,
  certainty,
  breed,
  children,
}: DogDetailsProps) => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContainer}
    >
      <Card style={styles.classificationContainer}>
        <Image
          style={styles.image}
          source={imageUri ? { uri: imageUri } : dogData[breed]["image"]}
        />
        <View style={styles.breedAndCertainty}>
          <Text style={styles.breedName}>{name}</Text>
          <Text style={styles.certainty}>
            {certainty
              ? `Certainty: ${certainty}%`
              : children
              ? dogData[breed].name
              : null}
          </Text>
        </View>
      </Card>
      <Card style={styles.personality}>
        <FontAwesome5 name="lightbulb" size={iconSize} style={styles.icons} />
        <Text style={styles.detailText}>{dogData[breed].personality}</Text>
      </Card>
      <Card style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <FontAwesome5
            name="arrows-alt-v"
            size={iconSize}
            style={styles.icons}
          />
          <Text style={styles.detailText}>{dogData[breed].height} cm</Text>
          <FontAwesome5
            name="weight-hanging"
            size={iconSize}
            style={styles.icons}
          />
          <Text style={styles.detailText}>{dogData[breed].weight} kg</Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome5 name="clock" size={iconSize} style={styles.icons} />
          <Text style={styles.detailText}>{dogData[breed].lifespan}</Text>
          <FontAwesome5
            name="map-marked-alt"
            size={iconSize}
            style={styles.icons}
          />
          <Text style={styles.detailText}>
            {dogData[breed].origin ? dogData[breed].origin : "n.a."}
          </Text>
        </View>
      </Card>
      {children}
    </ScrollView>
  );
};

const iconSize = 25;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenContainer: { justifyContent: "flex-start", alignItems: "center" },
  infoText: {
    padding: 40,
    alignSelf: "center",
  },
  classificationContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").width * 0.4,
    margin: 20,
    borderRadius: 25,
  },
  breedAndCertainty: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  breedName: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 20,
  },
  certainty: {
    color: "#6a6a6a",
    fontStyle: "italic",
    paddingRight: "10%",
    marginVertical: 10,
  },
  personality: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  personalityText: {
    margin: 15,
  },
  detailContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    padding: 10,
  },
  detailRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icons: {
    width: "10%",
    margin: Dimensions.get("window").width * 0.02,
    marginLeft: Dimensions.get("window").width * 0.04,
  },
  detailText: {
    flex: 1,
    color: "#6a6a6a",
    fontStyle: "italic",
    alignSelf: "center",
    margin: Dimensions.get("window").width * 0.03,
    flexWrap: "wrap",
  },
});

export default DogDetails;
