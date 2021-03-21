import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// SCREEN IMPORTS
import PersonalData from '../screens/profile/PersonalData'

const ProfileStack = createStackNavigator();
export default function ProfileStackComp() {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="PersonalData" component={PersonalData} />
    </ProfileStack.Navigator>
  );
};