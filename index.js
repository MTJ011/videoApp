/**
 * @format
 */

import 'react-native-gesture-handler'; // Make sure this is at the top
import { AppRegistry } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import App from './App';
import { name as appName } from './app.json';

const RootApp = () => (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <App />
    </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => RootApp);
