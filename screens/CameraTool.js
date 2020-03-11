import React from 'react';
import { 
  Text,
  Button,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity
} from 'react-native';

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
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      animationLineHeight: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      focusLineAnimation: new Animated.Value(0)
    };
  }
  camera = null;

  static navigationOptions = {
    tabBarIcon: CameraIcon
  };

  animatedLine = () => {
    Animated.sequence([
      Animated.timing(this.state.focusLineAnimation, {
        toValue: 1,
        duration: 1000
      }),
      Animated.timing(this.state.focusLineAnimation, {
        toValue: 0,
        duration: 1000
      })
    ]).start(this.animatedLine);
  };

  getPermission = async () => {
    const camera = await Permissions.askAsync(
      Permissions.CAMERA
    );
    const hasCameraPermission = camera.status === "granted";

    this.setState({ hasCameraPermission });
  };

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    let jsonData = {};
    if (this.isJson(data)) {
      jsonData = JSON.parse(data);
      alert(jsonData);
      Client.getMenu(jsonData.restaurant_id, jsonData.menu_id);
    } else {
      alert("This is not a valid QR code.");
    }
  };

  isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    this.getPermission();
  }

  componentDidUpdate() {
    this.animatedLine();
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission == null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={
            scanned ? undefined : this.handleBarCodeScanned
          }
          style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.overlay}>
          <View style={styles.unfocusedContainer}></View>

          <View style={styles.middleContainer}>
            <View style={styles.unfocusedContainer}></View>
            <View
              onLayout={e => {
                this.setState({
                  animationLineHeight: {
                    x: e.nativeEvent.layout.x,
                    y: e.nativeEvent.layout.y,
                    height: e.nativeEvent.layout.height,
                    width: e.nativeEvent.layout.width
                  }
                });
              }}
              style={styles.focusedContainer}
            >
              {!scanned && (
                <Animated.View
                  style={[
                    styles.animationLineStyle,
                    {
                      transform: [
                        {
                          translateY: this.state.focusLineAnimation.interpolate(
                            {
                              inputRange: [0, 1],
                              outputRange: [
                                0,
                                this.state.animationLineHeight.height
                              ]
                            }
                          )
                        }
                      ]
                    }
                  ]}
                />
              )}

              {scanned && (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ scanned: true });
                  }}
                  style={styles.rescanIconContainer}
                >
                  <Ionicons name={"md-refresh"} size={50} />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.unfocusedContainer}></View>
          </View>
          <View style={styles.unfocusedContainer}></View>
        </View>
        {/* {scanned && (
          <Button title={'Scan Again'} onPress={() => { this.setState({
                                                            scanned: true
                                                          }); }} />
          )} */
        }
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
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },

  middleContainer: {
    flexDirection: 'row',
    flex: 1.5,
  },

  focusedContainer: {
    flex: 6,
  },
  animationLineStyle: {
    height: 2,
    width: '100%',
    backgroundColor: 'red',
  },
  rescanIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
