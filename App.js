import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./navigation/DrawerNavigator";
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import {firebaseConfig} from './config';
import firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}
const Stack = createStackNavigator();

const StackNav=()=>{

    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
      </Stack.Navigator>
    );
  
}

export default function App() {
  return (
    <NavigationContainer>
      <StackNav/>
    </NavigationContainer>
  );
}