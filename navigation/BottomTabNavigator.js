import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Home from "../screens/Home";
import MyStatus from "../screens/MyStatus";

const BottomTabNavigator = createBottomTabNavigator({
  Home: Home,
  MyStatus: MyStatus
});

export default BottomTabNavigator;
