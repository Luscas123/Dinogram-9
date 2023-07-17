import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";
import * as Speech from "expo-speech";







export default class StoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speakerColor: "gray",
      speakerIcon: "volume-high-outline",
      isLiked: false,
    //   likes: this.props.route.params.post.likes,
    };
  }

  likeAction = () => {
    if (this.state.isLiked) {
      firebase
        .database()
        .ref("posts")
        .child(this.props.route.params.story_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(-1));
      this.setState({ likes: (this.state.likes -= 1), isLiked: false });
    } else {
      firebase
        .database()
        .ref("posts")
        .child(this.props.route.params.story_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(1));
      this.setState({ likes: (this.state.likes += 1), isLiked: true });
    }
  };

  

  componentDidMount() {
    
  }


  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Dinogram</Text>
            </View>
          </View>
          <View style={styles.storyContainer}>
            <ScrollView style={styles.storyCard}>
              <Image
                source={require("../assets/image_1.jpg")}
                style={styles.image}
              ></Image>

              <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                  <Text style={styles.storyTitleText}>
                    {this.props.route.params.post.title}
                  </Text>
                  <Text style={styles.storyAuthorText}>
                    {this.props.route.params.post.caption}
                  </Text>
                </View>
                
              </View>
              
              <View style={styles.actionContainer}>
                <TouchableOpacity
                  style={styles.likeButton}
                  onPress={() => {
                    this.likeAction();
                  }}
                >
                  <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                  <Text style={styles.likeText}>{this.state.likes}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
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
  storyContainer: {
    flex: 1,
  },
  storyCard: {
    margin: RFValue(20),
    backgroundColor: "#2a2a2a",
    borderRadius: RFValue(20),
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain",
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20),
  },
  titleTextContainer: {
    flex: 0.8,
  },
  storyTitleText: {
    
    fontSize: RFValue(25),
    color: "white",
  },
  storyAuthorText: {
    
    fontSize: RFValue(18),
    color: "white",
  },
  iconContainer: {
    flex: 0.2,
  },
  storyTextContainer: {
    padding: RFValue(20),
  },
  storyText: {
    
    fontSize: RFValue(15),
    color: "white",
  },
  moralText: {
    
    fontSize: RFValue(20),
    color: "white",
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30),
  },
  likeText: {
    color: "white",
    
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});
