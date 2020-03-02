import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Home from "../screens/Home";
import MyStatus from "../screens/MyStatus";
import CameraTool from '../screens/CameraTool';

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: Home,
    MyStatus: MyStatus,
    Camera: CameraTool
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);

export default BottomTabNavigator;
