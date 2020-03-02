import React from 'react';
import { View, StyleSheet } from 'react-native';

import ScreenTitle from '../components/ScreenTitle';
import { Ionicons } from "@expo/vector-icons";

const MyStatusIcon = props => (
  <Ionicons
    name={"md-stats"}
    size={35}
    color={props.focused ? "blue" : "grey"}
  />
);

export default class MyStatus extends React.Component {
  static navigationOptions = {
    tabBarIcon: MyStatusIcon
  };

  render() {
    return (
      <View style={styles.container}>
        <ScreenTitle name={"My status"} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});