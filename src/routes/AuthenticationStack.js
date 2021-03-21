import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS IMPORTS
import StartScreen from '../screens/authentication/StartScreen';
import RegisterScreen from '../screens/authentication/RegisterScreen';
import LoginScreen from '../screens/authentication/LoginScreen';

const AuthenticationStack = createStackNavigator();
export default function AuthenticationStackComp() {
  return (
    <AuthenticationStack.Navigator headerMode="none" initialRouteName="StartScreen">
      <AuthenticationStack.Screen name="StartScreen" component={StartScreen} />
      <AuthenticationStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <AuthenticationStack.Screen name="LoginScreen" component={LoginScreen} />
    </AuthenticationStack.Navigator>
  );
};