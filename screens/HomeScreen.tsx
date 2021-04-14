import React, { useEffect } from "react";
import { ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { useDispatch } from "react-redux";
import Card from "../components/Card";
import ImagePicker from "../components/ImagePicker";
import * as dogsActions from "../store/actions/dogs";

// ping the heroku server to wake it up
fetch("https://doggo-snap-api.herokuapp.com/health");

export interface HomeScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dogsActions.loadDogs());
  }, [dispatch]);

  const onImageTakenHandler = (imageUri: string): void => {
    navigation.navigate("Classification", { imageUri: imageUri });
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Card style={{ ...styles.card, ...styles.imagePickerCard }}>
        <ImagePicker onImageTaken={onImageTakenHandler} />
      </Card>
      <Card style={styles.card}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => navigation.navigate("DogList")}
        >
          <Text>Go to Dog list</Text>
        </TouchableOpacity>
      </Card>
      <Card style={styles.card}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => navigation.navigate("AllBreeds")}
        >
          <Text>Explore all Breeds</Text>
        </TouchableOpacity>
      </Card>
      <Card style={styles.card}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() =>
            navigation.navigate("Map", { readonly: true, allDogs: true })
          }
        >
          <Text>View your dogs on the map</Text>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
};

HomeScreen.navigationOptions = {
  headerTitle: "🐾 Doggo Snap 🐾",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  imagePickerCard: {
    height: 200,
  },
});

export default HomeScreen;
