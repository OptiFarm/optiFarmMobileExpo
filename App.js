import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";

// NAVIGATION
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./src/routes/TabNavigator";

// AUTHENTICATION
import { AuthContext } from "./src/components/context";

// STACK IMPORTS
import HomeStackComp from "./src/routes/HomeStack";
import MedicineStackComp from "./src/routes/MedicineStack";
import GroupStackComp from "./src/routes/GroupStack";
import ProfileStackComp from "./src/routes/ProfileStack";
import AuthenticationStackComp from "./src/routes/AuthenticationStack";

// LOADER
import { PageLoader } from "./src/components/atoms/PageLoader";

// GRAPHQL
import { ApolloProvider } from "@apollo/client";
import { makeApolloClient } from "./src/config/graphql/client";
import { getToken } from "./src/config/config";

const RootStack = createStackNavigator();

let store_token = getToken();

console.log("Token", store_token);
let client = new makeApolloClient();
export default function App() {
  const initialLoginState = {
    isLoading: false,
    isSignout: store_token._W === null ? true : false,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          isSignout: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          isSignout: true,
        };
      case "REGISTER":
        return {
          ...prevState,
          isSignout: false,
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
        dispatch({ type: "LOGIN" });
      },
      signOut: () => {
        client = new makeApolloClient(null);
        dispatch({ type: "LOGOUT" });
      },
      signUp: (token) => {
        client = new makeApolloClient(token);
        dispatch({ type: "REGISTER" });
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
