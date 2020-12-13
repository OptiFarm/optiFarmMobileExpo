import React, { useState, useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApplicationProvider } from '@ui-kitten/components';
import AppLoading from 'expo-app-loading';

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

const Tab = createBottomTabNavigator();

export default () => {
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
        <ApplicationProvider {...eva} theme={eva.dark}>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Group" component={GroupScreen} />
              <Tab.Screen name="Medicine" component={MedicineScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </>
    );
  }
};