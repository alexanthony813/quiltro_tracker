import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserScreen from "../screens/UserScreen";
import MessagesScreen from "../screens/MessagesScreen";

const Stack = createStackNavigator();

const UserNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="User" component={UserScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
  </Stack.Navigator>
);

export default UserNavigator;
