import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from "expo-barcode-scanner";

import Client from '../util/Client';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const CameraIcon = props => (
  <Ionicons
    name={"md-camera"}
    size={35}
    color={props.focused ? "blue" : "grey"}
  />
);

export default class CameraTool extends React.Component {
  camera = null;

  static navigationOptions = {
    tabBarIcon: CameraIcon
  };

  state = {
    hasCameraPermission: null,
    scanned: false
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(
      Permissions.CAMERA
    );
    const hasCameraPermission = camera.status === "granted";

    this.setState({ hasCameraPermission });
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission == null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <View>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={styles.preview}
        />
      </View>
    );
  };

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    let jsonData = {};
    if (this.isJson(data)) {
      jsonData = JSON.parse(data)
      Client.getMenu(jsonData.menu_id);
    } else {
      alert("This is not a valid QR code.");
    }
  };

  isJson(str) {
    try {
      JSON.parse(str)
    } catch(e) {
      return false;
    }
    return true;
  }
};

const styles = StyleSheet.create({
  preview: {
    height: winHeight,
    width: winWidth,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  }
})
