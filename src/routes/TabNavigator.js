import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// STACK IMPORTS
import HomeScreen from '../screens/home/HomeScreen';
import MedicineScreen from '../screens/medicine/MedicineScreen';
import GroupScreen from '../screens/group/GroupScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

// COMPONENT
import { View, ActivityIndicator, Text } from 'react-native';

// THEME
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'; 
import { cardBackground, defaultBackground, SPACING } from '../config/theme';

const Tab = createBottomTabNavigator();

// BOTTOM TAB BAR STYLING
const customTabBarStyle = {
  style: {
    backgroundColor: defaultBackground,
    borderTopColor: defaultBackground,
    height: 110,
  }
};

export default function TabNavigator() {
  return (
    <Tab.Navigator tabBarOptions={customTabBarStyle}       
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, dotColor, size}) => {
          let iconName;
          color = focused ? '#F4F3BE' : 'white'
          dotColor = focused ? '#F4F3BE' : defaultBackground
          if (route.name === 'HomeTab') {
            iconName = 'home'
          } else if (route.name === 'MedicineTab') {
            return (
              <>
              <MaterialCommunityIcons name="pill" size={30} color={color} style={{paddingTop: 0}} />
              <View style={{width: 5, height: 5, borderRadius: 100 / 2, backgroundColor: dotColor, top: 10}}></View>
              </>
            )
          } else if (route.name === 'GroupTab') {
            iconName = 'grid'
          } else if (route.name === 'ProfileTab') {
            iconName = 'user'
          }
          return (
            <>
            <Feather name={iconName} size={30} color={color} style={{paddingTop: 0}} />
            <View style={{width: 5, height: 5, borderRadius: 100 / 2, backgroundColor: dotColor, top: 10}}></View>
            </>
          )
        },
      })}>
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{tabBarLabel: ''}}/>
      <Tab.Screen name="MedicineTab" component={MedicineScreen} options={{tabBarLabel: ''}}/>
      <Tab.Screen name="GroupTab" component={GroupScreen} options={{tabBarLabel: ''}}/>
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{tabBarLabel: ''}}/>
    </Tab.Navigator>
  );
};