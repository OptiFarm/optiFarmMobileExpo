import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// SCREENS IMPORTS
import HerdBook from "../screens/home/HerdBook";
import MedicineUsage from "../screens/home/MedicineUsage";
import AnimalDetail from "../screens/home/AnimalDetail";
import AnimalForm from "../screens/home/AnimalForm";
import FormSuccess from "../screens/home/FormSuccess";
import SearchScreen from "../screens/home/SearchScreen";
import EditAnimalForm from "../screens/home/EditAnimalForm";
import UpdateFormSuccess from "../screens/home/UpdateFormSuccess";

const HomeStack = createStackNavigator();
export default function HomeStackComp() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="HerdBook" component={HerdBook} />
      <HomeStack.Screen name="MedicineUsage" component={MedicineUsage} />
      <HomeStack.Screen name="AnimalDetail" component={AnimalDetail} />
      <HomeStack.Screen name="AnimalForm" component={AnimalForm} />
      <HomeStack.Screen name="FormSuccess" component={FormSuccess} />
      <HomeStack.Screen name="SearchScreen" component={SearchScreen} />
      <HomeStack.Screen name="EditAnimalForm" component={EditAnimalForm} />
      <HomeStack.Screen
        name="UpdateFormSuccess"
        component={UpdateFormSuccess}
      />
    </HomeStack.Navigator>
  );
}
