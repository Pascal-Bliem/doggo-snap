import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Card from "../components/Card";
import ImagePicker from "../components/ImagePicker";

// ping the heroku server to wake it up
fetch("https://doggo-snap-api.herokuapp.com/health");

export interface HomeScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
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
        <Text>And one more other card</Text>
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
