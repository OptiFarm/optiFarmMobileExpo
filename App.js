import React, { useState, useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons'; 

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

// Details Screen
import AnimalDetail from './src/screens/AnimalDetail'
import MedicineDetail from './src/screens/MedicineDetail'
import GroupDetail from './src/screens/GroupDetail'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {

  // Custom styling
  const customTabBarStyle = {
    style: {
      backgroundColor: '#3A364D',
      borderTopColor: '#3A364D',
      height: 95
    }
  }

  return (
    <Tab.Navigator tabBarOptions={customTabBarStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size}) => {
          let iconName;
          color = focused ? '#FF569F' : 'white'
          if (route.name === 'Home') {
            iconName = 'home-outline'
          } else if (route.name === 'Group') {
            iconName = 'grid-outline'
          } else if (route.name === 'Medicine') {
            iconName = 'eyedrop-outline'
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline'
          }
          return <Ionicons name={iconName} size={30} color={color} />
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel: ''}} />
      <Tab.Screen name="Group" component={GroupScreen} options={{tabBarLabel: ''}}/>
      <Tab.Screen name="Medicine" component={MedicineScreen} options={{tabBarLabel: ''}}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarLabel: ''}}/>
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
              <Stack.Screen name="MedicineDetail" component={MedicineDetail} />
              <Stack.Screen name="GroupDetail" component={GroupDetail} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </>
    );
  }
};