import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import { NavigationScreenProp } from "react-navigation";
import modelConfig from "../constants/modelConfig";
import Colors from "../constants/colors";
import Card from "../components/Card";
import DogDetails from "../components/DogDetails";
import { FontAwesome5 } from "@expo/vector-icons";
import dogData from "../data/dogData";
import { Breeds } from "../models/dog";
import ENV from "../env";

const imageSize = modelConfig.imageSize;

export interface ClassificationScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

export interface ValueIdxPair {
  probability: number;
  breed: Breeds;
}

const ClassificationScreen = ({ navigation }: ClassificationScreenProps) => {
  const [apiOnline, setApiOnline] = useState(false);
  const [classification, setClassification] = useState<ValueIdxPair[]>();

  const imageUri: string = navigation.getParam("imageUri");

  const classify = useCallback(async () => {
    // check if the server is online
    const health = await fetch(ENV.healthApiUrl);
    if (!health.ok) {
      throw new Error("Checking server health status failed!");
    }
    const healthStatus: { status: string } = await health.json();

    if (healthStatus.status === "ok") {
      setApiOnline(true);
    } else {
      throw new Error("The server health status is not OK!");
    }

    // resize the taken image to imageSize
    const resized = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: imageSize, height: imageSize } }],
      { format: ImageManipulator.SaveFormat.JPEG }
    );
    const resizedUri = resized.uri;

    // create request body as form data
    let body = new FormData();
    body.append("image", {
      //@ts-ignore
      uri: resizedUri,
      name: "upload.jpg",
      type: "image/jpg",
    });
    body.append("topN", "3");

    // send post request with the image attached
    const response = await fetch(ENV.classificationApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error("Calling the classification API failed!");
    }

    const resData = await response.json();

    // set the classification state with the predictions from the response
    setClassification(resData["predictions"]);
  }, []);

  // call classification API
  useEffect(() => {
    classify();
  }, [classify]);

  // a function to save the classified dog
  const addDogHandler = useCallback(() => {
    if (!classification) {
      return;
    } else {
      navigation.navigate("AddDog", {
        breed: classification[0].breed,
        imageUri: imageUri,
      });
    }
  }, [navigation, classification, imageUri]);

  const iconSize = 25;

  return (
    <View style={styles.screen}>
      {!classification ? (
        <View>
          <ActivityIndicator
            style={{ marginTop: Dimensions.get("window").height * 0.4 }}
            size="large"
            color={Colors.primary}
          />
          {apiOnline ? (
            <Text style={styles.infoText}>
              The dog breed is being classified.
            </Text>
          ) : (
            <Text style={styles.infoText}>
              We're connecting you to the server. This can take a couple of
              seconds.
            </Text>
          )}
        </View>
      ) : (
        <DogDetails
          imageUri={imageUri}
          name={dogData[classification[0].breed].name}
          certainty={(classification[0].probability * 100).toFixed(0)}
          breed={classification[0].breed}
        >
          <Card style={styles.saveButtonContainer}>
            <TouchableOpacity onPress={addDogHandler} style={styles.saveButton}>
              <FontAwesome5 name="save" size={iconSize} style={styles.icons} />
              <Text style={styles.saveButtonText}>Save this Dog</Text>
            </TouchableOpacity>
          </Card>
        </DogDetails>
      )}
    </View>
  );
};

ClassificationScreen.navigationOptions = ({
  navigation,
}: ClassificationScreenProps) => {
  return {
    headerTitle: "Your Dog's Breed",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  infoText: {
    padding: 40,
    alignSelf: "center",
  },
  icons: {
    width: "10%",
    margin: Dimensions.get("window").width * 0.02,
    marginLeft: Dimensions.get("window").width * 0.04,
  },
  saveButtonContainer: {
    marginBottom: 50,
  },
  saveButton: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  saveButtonTextWrapper: {
    flex: 1,
  },
  saveButtonText: {
    flex: 1,
    alignSelf: "center",
    fontSize: 16,
    color: Colors.primary,
    fontStyle: "italic",
    margin: Dimensions.get("window").width * 0.03,
  },
});

export default ClassificationScreen;
