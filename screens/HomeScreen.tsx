import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { useDispatch } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import Card from "../components/Card";
import ImagePicker from "../components/ImagePicker";
import * as dogsActions from "../store/actions/dogs";
import Colors from "../constants/colors";

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
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContainer}
    >
      <Card style={{ ...styles.card, ...styles.imagePickerCard }}>
        <ImagePicker onImageTaken={onImageTakenHandler} />
      </Card>
      <Card style={styles.card}>
        <TouchableOpacity
          style={styles.actionCards}
          onPress={() => navigation.navigate("DogList")}
        >
          <FontAwesome5
            name="dog"
            size={iconSize}
            color={Colors.primary}
            style={styles.icon}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>View your Dogs</Text>
          </View>
        </TouchableOpacity>
      </Card>
      <Card style={styles.card}>
        <TouchableOpacity
          style={styles.actionCards}
          onPress={() =>
            navigation.navigate("Map", { readonly: true, allDogs: true })
          }
        >
          <FontAwesome5
            name="map"
            size={iconSize}
            color={Colors.ternary}
            style={styles.icon}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>View on Map</Text>
          </View>
        </TouchableOpacity>
      </Card>
      <Card style={{ ...styles.card, marginBottom: 20 }}>
        <TouchableOpacity
          style={styles.actionCards}
          onPress={() => navigation.navigate("AllBreeds")}
        >
          <FontAwesome5
            name="list-ul"
            size={iconSize}
            color={Colors.primary}
            style={styles.icon}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Explore Breeds</Text>
          </View>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
};

HomeScreen.navigationOptions = {
  headerTitle: "🐾 Doggo Snap 🐾",
};

const iconSize = 40;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // height: "100%",
  },
  screenContainer: {
    // flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    minHeight: 100,
  },
  imagePickerCard: {
    height: 200,
  },
  titleContainer: {
    position: "absolute",
    width: "100%",
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    left: Dimensions.get("window").width * 0.05,
    marginRight: 20,
  },
  actionCards: {
    position: "relative",
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default HomeScreen;
