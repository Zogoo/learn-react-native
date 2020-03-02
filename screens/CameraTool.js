import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Camera } from "expo-camera";
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';

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
    cameraType: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off
  };

  setFlashMode = flashMode => this.setState({ flashMode });
  setCameraType = cameraType => this.setState({ cameraType });

  async componentDidMount() {
    const camera = await Permissions.askAsync(
      Permissions.CAMERA
    );
    const hasCameraPermission = camera.status === "granted";

    this.setState({ hasCameraPermission });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission == null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <View>
        <Camera
          type={cameraType}
          flashMode={flashMode}
          style={styles.preview}
          ref={camera => (this.camera = camera)}
        />
      </View>
    );
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
