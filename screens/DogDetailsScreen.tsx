import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { RootState } from "../App";
import DogDetails from "../components/DogDetails";
import dogData from "../data/dogData";
import Dog, { Breeds } from "../models/dog";
import Colors from "../constants/colors";
import Card from "../components/Card";
import MapPreview from "../components/MapPreview";
import * as dogsActions from "../store/actions/dogs";

export interface DogDetailsScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const DogDetailsScreen = ({ navigation }: DogDetailsScreenProps) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const id: string = navigation.getParam("id");
  // if the  id is one of the breed keys in dogData, we want to display the
  // standard breed information and not a dog which the user has classified
  const isOwnDog = Object.keys(dogData).includes(id) ? false : true;

  // depending on isOwnDog, either take the right dog from the state or
  // get the general breed information
  const dog = isOwnDog
    ? useSelector((state: RootState) =>
        state.dogs.dogs.find((dog: Dog) => String(dog.id) === String(id))
      )
    : dogData[id as Breeds];

  const onMapPreviewPressHandler = () => {
    navigation.navigate("Map", {
      readonly: true,
      initialLocation: isOwnDog
        ? { latitude: dog.latitude, longitude: dog.longitude }
        : null,
    });
  };

  const dispatch = useDispatch();
  const deleteDogHandler = () => {
    // if !isOwnDog, the button triggering this function is not rendered
    Alert.alert("Are you sure?", "Do you really want to delete this dog?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          await setIsDeleted(true);
          dispatch(dogsActions.removeDog(Number(id)));
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      {isDeleted ? (
        <View></View>
      ) : (
        <DogDetails
          imageUri={isOwnDog ? dog.imageUri : null}
          name={dog.name}
          breed={isOwnDog ? dog.breed : id}
        >
          {isOwnDog && (
            <View style={styles.childrenContainer}>
              <Card>
                <MapPreview
                  location={{
                    latitude: dog.latitude,
                    longitude: dog.longitude,
                  }}
                  style={styles.mapPreview}
                  onPress={onMapPreviewPressHandler}
                />
                <Text style={styles.address}>{dog.address}</Text>
              </Card>
              <Card style={styles.deleteButtonContainer}>
                <TouchableOpacity
                  onPress={deleteDogHandler}
                  style={styles.deleteButton}
                >
                  <FontAwesome5
                    name="trash-alt"
                    size={25}
                    style={styles.icons}
                  />
                  <Text style={styles.deleteButtonText}>Delete this Dog</Text>
                </TouchableOpacity>
              </Card>
            </View>
          )}
        </DogDetails>
      )}
    </View>
  );
};

DogDetailsScreen.navigationOptions = {
  headerTitle: "Details",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  childrenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  mapPreview: {
    flex: 1,
    margin: "5%",
    width: "90%",
    height: 150,
    borderRadius: 15,
    overflow: "hidden",
  },
  address: {
    flex: 1,
    color: "#6a6a6a",
    fontStyle: "italic",
    alignSelf: "center",
    margin: Dimensions.get("window").width * 0.03,
    marginTop: 0,
    flexWrap: "wrap",
  },
  icons: {
    width: "10%",
    margin: Dimensions.get("window").width * 0.02,
    marginLeft: Dimensions.get("window").width * 0.04,
  },
  deleteButtonContainer: {
    marginTop: 20,
    marginBottom: 50,
  },
  deleteButton: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  deleteButtonTextWrapper: {
    flex: 1,
  },
  deleteButtonText: {
    flex: 1,
    alignSelf: "center",
    fontSize: 16,
    color: Colors.primary,
    margin: Dimensions.get("window").width * 0.03,
  },
});

export default DogDetailsScreen;
