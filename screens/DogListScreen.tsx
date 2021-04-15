import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../App";
import * as dogsActions from "../store/actions/dogs";
import DogListItem from "../components/DogListItem";

export interface DogListScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const DogListScreen = ({ navigation }: DogListScreenProps) => {
  const dogs = useSelector((state: RootState) => state.dogs.dogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dogsActions.loadDogs());
  }, [dispatch]);

  const onPressHandler = (id: string) => {
    navigation.navigate("DogDetails", { id: id });
  };

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContentContainer}
        data={dogs.reverse()}
        keyExtractor={(item) => String(item.id)}
        renderItem={(itemData) => {
          return (
            <DogListItem
              id={String(itemData.item.id)}
              imageUri={itemData.item.imageUri}
              name={itemData.item.name}
              breed={itemData.item.breed}
              address={itemData.item.address}
              onPress={onPressHandler}
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
