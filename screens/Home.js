import React from 'react';
import { View, StyleSheet } from 'react-native';

import ScreenTitle from '../components/ScreenTitle';
import { Ionicons } from "@expo/vector-icons";

const HomeIcon = props => (
  <Ionicons
    name={"md-home"}
    size={35}
    color={props.focused ? "blue" : "grey"}
  />
);

export default class Home extends React.Component {
  static navigationOptions = {
    tabBarIcon: HomeIcon
  };

  render() {
    return (
      <View style={styles.container}>
        <ScreenTitle name={"Home"} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});