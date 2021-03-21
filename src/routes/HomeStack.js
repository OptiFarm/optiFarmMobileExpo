import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS IMPORTS
import HerdBook from '../screens/home/HerdBook';
import Remedies from '../screens/home/Remedies';
import AnimalDetail from '../screens/home/AnimalDetail';
import AnimalForm from '../screens/home/AnimalForm';
import FormSuccess from '../screens/home/FormSuccess';

const HomeStack = createStackNavigator();
export default function HomeStackComp() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="HerdBook" component={HerdBook} />
      <HomeStack.Screen name="Remedies" component={Remedies} />
      <HomeStack.Screen name="AnimalDetail" component={AnimalDetail} />
      <HomeStack.Screen name="AnimalForm" component={AnimalForm} />
      <HomeStack.Screen name="FormSuccess" component={FormSuccess} />
    </HomeStack.Navigator>
  );
}