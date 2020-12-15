import React, { useState, useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons'; 
import {View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import HomeScreen from './src/screens/HomeScreen';
import GroupScreen from './src/screens/GroupScreen';
import MedicineScreen from './src/screens/MedicineScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import HerdBook from './src/screens/HerdBook';

// Details Screen
import AnimalDetail from './src/screens/AnimalDetail';
import MedicineDetail from './src/screens/MedicineDetail';
import GroupDetail from './src/screens/GroupDetail';

// Authentication Screen
import LoginScreen from './src/screens/authentication/LoginScreen';
import RegisterScreen from './src/screens/authentication/RegisterScreen';
import WelcomeScreen from './src/screens/authentication/WelcomeScreen';
import { AuthContext } from './src/components/context';

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

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)
  
  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', id: userName , token: userToken });
    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('userToken')
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT'});
    },
    signUp: () => {
    },
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'REGISTER', token: userToken });
    }, 1000);
  }, []);

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
    if (loginState.isLoading) {
      return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <>
        <AuthContext.Provider value={authContext}>
          <ApplicationProvider {...eva} theme={eva.light}>
            <NavigationContainer>
              { loginState.userToken !== null ? (
                <Stack.Navigator headerMode="none">
                  <Stack.Screen name="Home" component={HomeTabs} />
                  <Stack.Screen name="Herd" component={HerdBook} />
                  <Stack.Screen name="AnimalDetail" component={AnimalDetail} />
                  <Stack.Screen name="MedicineDetail" component={MedicineDetail} />
                  <Stack.Screen name="GroupDetail" component={GroupDetail} />
                </Stack.Navigator>
              )
            :
              <LoginScreen />
            }
            </NavigationContainer>
          </ApplicationProvider>
        </AuthContext.Provider>
      </>
    );
  }
};