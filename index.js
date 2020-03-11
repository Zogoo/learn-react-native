import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as MyMenu } from "./app.json";

AppRegistry.registerComponent(MyMenu, () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('MyMenu', { rootTag });
}
