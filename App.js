import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";

// NAVIGATION
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./src/routes/TabNavigator";

// AUTHENTICATION
import { AuthContext } from "./src/components/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

// STACK IMPORTS
import HomeStackComp from "./src/routes/HomeStack";
import MedicineStackComp from "./src/routes/MedicineStack";
import GroupStackComp from "./src/routes/GroupStack";
import ProfileStackComp from "./src/routes/ProfileStack";
import AuthenticationStackComp from "./src/routes/AuthenticationStack";

// LOADER
import { PageLoader } from "./src/components/atoms/PageLoader";

// GRAPHQL
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const RootStack = createStackNavigator();

// GRAPHQL CLIENT
const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: "http://54.144.86.17:4000/optiFarm",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDc4NzQ0Y2MwOTBiZjEzMGMxYWQyNTgiLCJpYXQiOjE2MTg1MDY5NzV9.SgkjF5GQiHt4UyDI_cfBCASo3AfaGYQakgfL2ens7uQ",
    "Content-Type": "application/json",
  },
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
});

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].username;
        try {
          await AsyncStorage.setItem("userToken", userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGIN", id: userName, token: userToken });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {},
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "REGISTER", token: userToken });
    }, 2000);
  }, []);

  let [fontsloaded] = useFonts({
    "Sora-Medium": require("./src/assets/fonts/Sora-Medium.ttf"),
    "Sora-Bold": require("./src/assets/fonts/Sora-Bold.ttf"),
    "Sora-SemiBold": require("./src/assets/fonts/Sora-SemiBold.ttf"),
  });

  if (!fontsloaded) {
    return null;
  } else {
    if (loginState.isLoading) {
      return <PageLoader />;
    }
    return (
      <>
        <ApolloProvider client={client}>
          <AuthContext.Provider value={authContext}>
            <NavigationContainer>
              {loginState.userToken !== null ? (
                <RootStack.Navigator headerMode="none">
                  <RootStack.Screen name="Back" component={TabNavigator} />
                  <RootStack.Screen name="Home" component={HomeStackComp} />
                  <RootStack.Screen
                    name="Medicine"
                    component={MedicineStackComp}
                  />
                  <RootStack.Screen name="Group" component={GroupStackComp} />
                  <RootStack.Screen
                    name="Profile"
                    component={ProfileStackComp}
                  />
                </RootStack.Navigator>
              ) : (
                <RootStack.Navigator headerMode="none">
                  <RootStack.Screen
                    name="Authentication"
                    component={AuthenticationStackComp}
                  />
                </RootStack.Navigator>
              )}
            </NavigationContainer>
          </AuthContext.Provider>
        </ApolloProvider>
      </>
    );
  }
}
