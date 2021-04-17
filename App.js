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
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import { makeApolloClient } from "./src/config/graphql/client";

const RootStack = createStackNavigator();

// GRAPHQL CLIENT
// const cache = new InMemoryCache();
// const client = new ApolloClient({
//   uri: "http://54.144.86.17:4000/optiFarm",
//   headers: {
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmJkNWE2NGJjOTM3MDA0ZjRhZDIxZDIiLCJpYXQiOjE2MTg2NzIzNzF9.hmsiY8zzfVBCQtpIO4tQ7JmloSUeAiQ5KXl109oTZJ8",
//     "Content-Type": "application/json",
//   },
//   cache,
//   defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
// });

let client = new makeApolloClient(null);
export default function App() {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);
  const initialLoginState = {
    isLoading: false,
    isSignout: true,
    // userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          // userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          isSignout: false,
          // userToken: action.token,
        };
      case "LOGOUT":
        return {
          ...prevState,
          isSignout: true,
          // userToken: null,
        };
      case "REGISTER":
        return {
          ...prevState,
          isSignout: true,
          // userToken: action.token,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: (token) => {
        client = new makeApolloClient(token);
        // dispatch({ type: "LOGIN", token: token });
        dispatch({ type: "LOGIN" });
      },
      signOut: async () => {
        client = new makeApolloClient(null);
        dispatch({ type: "LOGOUT" });
      },
      signUp: (token) => {
        client = new makeApolloClient(token);
        dispatch({ type: "REGISTER", token: token });
      },
    }),
    []
  );

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
              {loginState.isSignout ? (
                <RootStack.Navigator headerMode="none">
                  <RootStack.Screen
                    name="Authentication"
                    component={AuthenticationStackComp}
                  />
                </RootStack.Navigator>
              ) : (
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
              )}
            </NavigationContainer>
          </AuthContext.Provider>
        </ApolloProvider>
      </>
    );
  }
}
