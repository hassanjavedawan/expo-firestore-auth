/** @format */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Add from "../Screens/Add";
import Show from "../Screens/Show";
import Update from "../Screens/Update";
import Login from "../Screens/Login";
import Profile from "../Screens/Profile";

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Add'
          options={{
            headerStyle: { backgroundColor: "orange" },
            headerTitle: "REGISTER",
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
          }}
          component={Add}
        />

        <Stack.Screen
          name='Show'
          options={{
            headerStyle: { backgroundColor: "orange" },
            headerTitle: "SHOW DATA",
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
          }}
          component={Show}
        />

        <Stack.Screen
          name='Update'
          options={{
            headerStyle: { backgroundColor: "orange" },
            headerTitle: "UPDATE DATA",
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
          }}
          component={Update}
        />

        <Stack.Screen
          name='Login'
          options={{
            headerStyle: { backgroundColor: "orange" },
            headerTitle: "LOGIN",
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
          }}
          component={Login}
        />

        <Stack.Screen
          name='Profile'
          options={{
            headerStyle: { backgroundColor: "orange" },
            headerTitle: "PROFILE",
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
          }}
          component={Profile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
