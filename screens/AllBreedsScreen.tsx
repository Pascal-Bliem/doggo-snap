import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import dogData from "../data/dogData";
import DogListItem from "../components/DogListItem";
import { Breeds } from "../models/dog";

export interface AllBreedsScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const AllBreedsScreen = ({ navigation }: AllBreedsScreenProps) => {
  const breedKeys: Breeds[] = Object.keys(dogData) as Array<
    keyof typeof dogData
  >;

  const onPressHandler = (id: string) => {
    navigation.navigate("DogDetails", { id });
  };

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContentContainer}
        data={breedKeys}
        keyExtractor={(item) => item}
        renderItem={(itemData) => {
          return (
            <DogListItem
              id={itemData.item}
              breed={itemData.item}
              name={dogData[itemData.item]["name"]}
              onPress={onPressHandler}
            />
          );
        }}
      />
    </View>
  );
};

AllBreedsScreen.navigationOptions = {
  headerTitle: "All Breeds",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  list: { paddingBottom: 20, width: "100%", height: "100%" },
  listContentContainer: {
    alignItems: "center",
  },
});

export default AllBreedsScreen;
