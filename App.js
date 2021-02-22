import React, { useState, useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import AppLoading from 'expo-app-loading';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { enableScreens } from 'react-native-screens';

// Components
import {View, ActivityIndicator, Text} from 'react-native';

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
import Remedies from './src/screens/Remedies';

// Details Screen
import AnimalDetail from './src/screens/AnimalDetail';
import MedicineDetail from './src/screens/MedicineDetail';
import GroupDetail from './src/screens/GroupDetail';

// Forms Screen
import MedicineForm from './src/screens/forms/MedicineForm';
import AnimalForm from './src/screens/forms/AnimalForm';
import GroupForm from './src/screens/forms/GroupForm';
import FormSuccess from './src/screens/forms/FormSuccess';

// Authentication Screen
import LoginScreen from './src/screens/authentication/LoginScreen';
import RegisterScreen from './src/screens/authentication/RegisterScreen';
import StartScreen from './src/screens/authentication/StartScreen';
import { AuthContext } from './src/components/context';
import { cardBackground, defaultBackground } from './src/config/theme';

enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  // Custom styling
  const customTabBarStyle = {
    style: {
      backgroundColor: cardBackground,
      borderTopColor: cardBackground,
      height: 95
    }
  }
  return (
    <Tab.Navigator tabBarOptions={customTabBarStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, dotColor, size}) => {
          let iconName;
          color = focused ? 'white' : 'white'
          dotColor = focused ? 'white' : cardBackground
          if (route.name === 'Home') {
            iconName = 'home-filled'
          } else if (route.name === 'Group') {
            iconName = 'grid-view'
          } else if (route.name === 'Medicine') {
            return (
              <>
              <MaterialCommunityIcons name="pill" size={30} color={color} style={{paddingTop: 10}} />
              <View style={{width: 5, height: 5, borderRadius: 100 / 2, backgroundColor: dotColor, top: 5}}></View>
              </>
            )

          } else if (route.name === 'Settings') {
            iconName = 'settings'
          }
          return (
            <>
            <MaterialIcons name={iconName} size={30} color={color} style={{paddingTop: 10}} />
            <View style={{width: 5, height: 5, borderRadius: 100 / 2, backgroundColor: dotColor, top: 5}}></View>
            </>
          )
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel: ''}}/>
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
    }, 2000);
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
  return null
} else {
    if (loginState.isLoading) {
      return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: defaultBackground}}>
          <ActivityIndicator />
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
                  <Stack.Screen name="Remedies" component={Remedies} />
                  <Stack.Screen name="AnimalDetail" component={AnimalDetail} />
                  <Stack.Screen name="MedicineDetail" component={MedicineDetail} />
                  <Stack.Screen name="GroupDetail" component={GroupDetail} />
                  <Stack.Screen name="MedicineForm" component={MedicineForm} />
                  <Stack.Screen name="AnimalForm" component={AnimalForm} />
                  <Stack.Screen name="GroupForm" component={GroupForm} />
                  <Stack.Screen name="FormSuccess" component={FormSuccess} />
                </Stack.Navigator>
              )
            :
                <Stack.Navigator initialRouteName="StartScreen" screenOptions={{headerShown: false}}>
                  <Stack.Screen name="StartScreen" component={StartScreen} />
                  <Stack.Screen name="LoginScreen" component={LoginScreen} />
                  <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                </Stack.Navigator>
            }
            </NavigationContainer>
          </ApplicationProvider>
        </AuthContext.Provider>
      </>
    );
  }
};