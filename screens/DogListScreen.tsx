import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../App";
import * as dogsActions from "../store/actions/dogs";

const DogListScreen = () => {
  const dogs = useSelector((state: RootState) => state.dogs.dogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dogsActions.loadDogs());
  }, [dispatch]);

  return (
    <View>
      <FlatList
        data={dogs}
        keyExtractor={(item) => String(item.id)}
        renderItem={(itemData) => {
          return <Text>{itemData.item.name}</Text>;
        }}
      />
    </View>
  );
};

DogListScreen.navigationOptions = {
  headerTitle: "Your Dogs",
};

export default DogListScreen;
