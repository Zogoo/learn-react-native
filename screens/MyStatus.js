import React from 'react';
import { View, StyleSheet } from 'react-native';

import ScreenTitle from '../components/ScreenTitle';

export default class MyStatus extends React.Component {

  static navigationOptions = {

  };

  render() {
    return (
      <View style={styles.container}>
        <ScreenTitle name={"My status"} />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});