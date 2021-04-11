import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../App";
import * as dogsActions from "../store/actions/dogs";
import DogListItem from "../components/DogListItem";

const DogListScreen = () => {
  const dogs = useSelector((state: RootState) => state.dogs.dogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dogsActions.loadDogs());
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContentContainer}
        data={dogs}
        keyExtractor={(item) => String(item.id)}
        renderItem={(itemData) => {
          return (
            <DogListItem
              id={String(itemData.item.id)}
              imageUri={itemData.item.imageUri}
              name={itemData.item.name}
              breed={itemData.item.breed}
              address={itemData.item.address}
            />
          );
        }}
      />
    </View>
  );
};

DogListScreen.navigationOptions = {
  headerTitle: "Your Dogs",
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

export default DogListScreen;
