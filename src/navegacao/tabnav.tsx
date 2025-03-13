import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../telas/home";
import Coleta from "../telas/coleta";
import Config from "../telas/config";
import Login from "../telas/login";
import { useAuth } from "../hooks/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "green",
      tabBarInactiveTintColor: "gray",
      headerShown: false,
    }}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Coleta" component={Coleta} />
    <Tab.Screen name="Config" component={Config} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={TabNavigator} />
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
