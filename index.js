/**
 * @format
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './redux/Store';
import MyScreen from './MyScreen';
import ExampleApp from './QRCodeScannerScreen';

//将所有组建放到Provider中

const Stack = createStackNavigator();


const Root = () => (
    <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={App}/>
                <Stack.Screen name="MyScreen" component={MyScreen}/>
                <Stack.Screen name="ExampleApp" component={ExampleApp}/>
            </Stack.Navigator>

        </NavigationContainer>
    </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
