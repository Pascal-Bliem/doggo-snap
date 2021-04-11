import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Colors from "../constants/colors";
import HomeScreen from "../screens/HomeScreen";
import ClassificationScreen from "../screens/ClassificationScreen";
import AddDogScreen from "../screens/AddDogScreen";
import MapScreen from "../screens/MapScreen";
import DogListScreen from "../screens/DogListScreen";

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Classification: ClassificationScreen,
    AddDog: AddDogScreen,
    Map: MapScreen,
    DogList: DogListScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTitleStyle: { alignSelf: "center" },
      headerTitleAlign: "center",
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    },
  }
);

export default createAppContainer(AppNavigator);
