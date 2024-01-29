/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

if (__DEV__) {
  import('react-native-flipper').then(() =>
    console.log('Flipper is connected!'),
  );
}

AppRegistry.registerComponent(appName, () => App);
