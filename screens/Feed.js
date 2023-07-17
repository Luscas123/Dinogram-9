import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import PostCard from "./PostCard.js";

import { FlatList } from "react-native-gesture-handler";
import firebase from "firebase";

let posts = require("./temp_posts.json");

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true,
            posts: []
        };
    }

    componentDidMount() { 
        this.fetchUser();
        this.fetchStories();
    }

    renderItem = ({ item: post }) => {
        return <PostCard post={post} navigation={this.props.navigation} />;
    };

    keyExtractor = (item, index) => index.toString();

    fetchStories = () => {
      firebase
        .database()
        .ref("/posts/")
        .on(
          "value",
          snapshot => {
            let posts = [];
            if (snapshot.val()) {
              Object.keys(snapshot.val()).forEach(function (key) {
                posts.push({
                  key: key,
                  value: snapshot.val()[key]
                });
              });
            }
            this.setState({ posts: posts });
            //this.props.setUpdateToFalse();
          },
          function (errorObject) {
            console.log("A leitura falhou: " + errorObject.code);
          }
        );
    };
    
    async fetchUser() {
        let theme;
        await firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", (snapshot)=> {
            theme = snapshot.val().current_theme;
        this.setState({
                light_theme: theme === "light",
                isEnabled: theme === "light"
            
              });
          });  
      }

    render() {
        return (
            <View style={this.state.light_theme? styles.containerLight: styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image
                            source={require("../assets/logo.png")}
                            style={styles.iconImage}
                        ></Image>
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text style={this.state.light_theme? styles.appTitleTextLight: styles.appTitleText}>Espectagrama</Text>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    { !this.state.posts[0]? 
                    <View> <Text> Nenhum pos encontrado </Text></View>
                    :<FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.posts}
                        renderItem={this.renderItem}
                    />}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
    },
    containerLight: {
      flex: 1,
      backgroundColor: "white",
    },
    droidSafeArea: {
      marginTop:
        Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
    },
    appTitle: {
      flex: 0.2,
      flexDirection: "row",
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center",
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center",
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(28),
      
    },
    appTitleTextLight: {
      color: "#15193c",
      fontSize: RFValue(28),
      
    },
    cardContainer: {
      flex: 0.93,
    },
    noStories: {
      flex: 0.85,
      justifyContent: "center",
      alignItems: "center"
    },
    noStoriesTextLight: {
      fontSize: RFValue(40),
    
    },
    noStoriesText: {
      color: "white",
      fontSize: RFValue(40),
      
    }
  });
  
