import React, { useState, useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import AppLoading from 'expo-app-loading';

// Navigations
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Fonts
import {
  useFonts,
  RobotoMono_100Thin,
  RobotoMono_100Thin_Italic,
  RobotoMono_300Light,
  RobotoMono_300Light_Italic,
  RobotoMono_400Regular,
  RobotoMono_400Regular_Italic,
  RobotoMono_500Medium,
  RobotoMono_500Medium_Italic,
  RobotoMono_700Bold,
  RobotoMono_700Bold_Italic,
} from '@expo-google-fonts/roboto-mono';

// Screens
import HomeScreen from './src/screens/HomeScreen'
import GroupScreen from './src/screens/GroupScreen'
import MedicineScreen from './src/screens/MedicineScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import HerdBook from './src/screens/HerdBook'
import AnimalDetail from './src/screens/AnimalDetail'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Group" component={GroupScreen} />
      <Tab.Screen name="Medicine" component={MedicineScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

export default function App () {
  let [fontsloaded] = useFonts({
    RobotoMono_100Thin,
    RobotoMono_100Thin_Italic,
    RobotoMono_300Light,
    RobotoMono_300Light_Italic,
    RobotoMono_400Regular,
    RobotoMono_400Regular_Italic,
    RobotoMono_500Medium,
    RobotoMono_500Medium_Italic,
    RobotoMono_700Bold,
    RobotoMono_700Bold_Italic,
  });

if (!fontsloaded) {
  return <AppLoading />
} else {
    return (
      <>
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="Home" component={HomeTabs} />
              <Stack.Screen name="Herd" component={HerdBook} />
              <Stack.Screen name="AnimalDetail" component={AnimalDetail} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </>
    );
  }
};