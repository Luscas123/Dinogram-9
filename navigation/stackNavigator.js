import React, { Component } from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import Profile from "../screens/Profile";
import PostScreen from "../screens/PostScreen";

const St = createStackNavigator();

export default class Stack extends Component {
  render() {
    return (
      <St.Navigator>
        <St.Screen name="BottomTab" component={TabNavigator} />
        <St.Screen name="PostScreen" component={PostScreen} />
      </St.Navigator>
    );
  }
}