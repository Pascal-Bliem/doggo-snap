import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { useDispatch } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import dogData from "../data/dogData";
import { Breeds } from "../models/dog";
import Colors from "../constants/colors";
import Card from "../components/Card";
import Input from "../components/Input";
import LocationPicker, { LocationType } from "../components/LocationPicker";
import Dog from "../models/dog";
import * as dogsActions from "../store/actions/dogs";

export interface AddDogScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const AddDogScreen = ({ navigation }: AddDogScreenProps) => {
  const breed: Breeds = navigation.getParam("breed");
  const imageUri: string = navigation.getParam("imageUri");
  const editedDog: Dog | undefined = navigation.getParam("editedDog");

  const [dogName, setDogName] = useState(editedDog ? editedDog.name : "");
  const [dogLatitude, setDogLatitude] = useState(
    editedDog ? editedDog.latitude : 0
  );
  const [dogLongitude, setDogLongitude] = useState(
    editedDog ? editedDog.longitude : 0
  );

  const dispatch = useDispatch();

  const inputChangeHandler = (id: string, name: string, isValid: boolean) => {
    if (id === "name" && isValid) {
      setDogName(name);
    }
  };

  const locationPickedHandler = (location: LocationType) => {
    setDogLatitude(location.latitude);
    setDogLongitude(location.longitude);
  };

  const saveDogHandler = () => {
    dispatch(
      dogsActions.addDog(breed, dogName, imageUri, dogLatitude, dogLongitude)
    );
    // navigate Home first and then to the DogList so that one can get back
    // to Home from the DogList instead of going back to AddDog
    navigation.navigate("Home");
    navigation.navigate("DogList");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={50}
    >
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.screenContainer}
      >
        <Card style={styles.classificationContainer}>
          <Image style={styles.image} source={{ uri: imageUri }} />
          <View style={styles.breedContainer}>
            <Text style={styles.breedName}>{dogData[breed].name}</Text>
          </View>
        </Card>
        <Card style={styles.nameInput}>
          <Input
            id="name"
            label="Name"
            errorText="Please enter a valid name!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect={false}
            returnKeyType="done"
            onInputChange={inputChangeHandler}
            initialValue={editedDog ? editedDog.name : ""}
            initiallyValid={!!editedDog}
            required={true}
          />
        </Card>
        <Card style={styles.locationContainer}>
          <LocationPicker
            navigation={navigation}
            onLocationPicked={locationPickedHandler}
          />
        </Card>
        <Card style={styles.saveButtonContainer}>
          <TouchableOpacity
            disabled={dogName && dogLatitude && dogLongitude ? false : true}
            onPress={saveDogHandler}
            style={styles.saveButton}
          >
            <FontAwesome5 name="save" size={25} style={styles.icons} />
            <Text style={styles.saveButtonText}>
              {dogName && dogLatitude && dogLongitude
                ? "Save this Dog"
                : "Pick a name and location before saving"}
            </Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

AddDogScreen.navigationOptions = {
  headerTitle: "Save your Dog",
};

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
  breedContainer: {
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
  nameInput: {
    padding: Dimensions.get("window").width * 0.05,
  },
  locationContainer: {
    marginVertical: 20,
    padding: Dimensions.get("window").width * 0.05,
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
    margin: Dimensions.get("window").width * 0.03,
  },
});

export default AddDogScreen;
