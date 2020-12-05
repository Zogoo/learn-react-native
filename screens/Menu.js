import react from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Animated
} from 'react-native'

import { Ionicons } from '@expo/vector-icons';

const MenuIcon = porps => {
  <Ionicons
    type="md-menu"
    size="35"
    color={props.focused ? "blue" : "grey"}
  />
}

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    tabBarIcon: MenuIcon
  };

  componentDidMount() {

  }

  render() {
    
  }

};