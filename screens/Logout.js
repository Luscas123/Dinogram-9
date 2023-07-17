import React, {Component} from "react";
import { Alert, View } from "react-native";
import firebase from "firebase";

export default class LogOut extends Component{
    componentDidMount(){
        firebase.auth().signOut()
        this.props.navigation.replace("Login")
        alert ("Volte logo, não use DUOLINGO né @Amanda")
    }

    render(){
        return(
            <View></View>
        )
    }
}