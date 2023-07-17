import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        light_theme: true,
        post_id: this.props.post.key,
        post_data: this.props.post.value,
        isLiked: false,
        likes: this.props.post.value.likes,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    let theme;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({
          light_theme: theme === "light",
          isEnabled: theme === "light",
        });
      });
  }

  render() {
    let post = this.state.post_data
    let preview_images = {
      image_1: require("../assets/image_1.jpg"),
      image_2: require("../assets/image_2.jpg"),
      image_3: require("../assets/image_3.jpg"),
      image_4: require("../assets/image_4.jpg"),
      image_5: require("../assets/image_5.jpg"),
      image_6: require("../assets/image_6.jpg"),
      image_7: require("../assets/image_7.jpg"),
    };
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          this.props.navigation.navigate("PostScreen", {
            post:post, post_id: this.state.post_id
          })
        }
      >
        <View
          style={
            this.state.light_theme ? styles.cardContainerLight : styles.cardContainer
          }
        >
          <View style={styles.authorContainer}>
            <View style={styles.authorImageContainer}>
              <Image
                source={require("../assets/profile_img.png")}
                style={styles.profileImage}
              ></Image>
            </View>
            <View style={styles.authorNameContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.storyTitleTextLight
                    : styles.storyTitleText
                }
              >
                {post.title}
              </Text>
            </View>
          </View>
          <Image
            source={preview_images[post.preview_image]}
            style={styles.postImage}
          />
          <View style={styles.captionContainer}>
            <Text
              style={
                this.state.light_theme
                  ? styles.storyTitleTextLight
                  : styles.storyTitleText
              }
            >
              {post.legenda}
            </Text>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.likeButton}>
              <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
              <Text style={styles.likeText}>12k</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cardContainer: {
      margin: RFValue(13),
      backgroundColor: "#2a2a2a",
      borderRadius: RFValue(20),
    },
    cardContainerLight: {
      margin: RFValue(13),
      backgroundColor: "white",
      borderRadius: RFValue(20),
    },
    postImage: {
      resizeMode: "contain",
      width: "95%",
      alignSelf: "center",
      height: RFValue(250),
    },
    titleContainer: {
      paddingLeft: RFValue(20),
      justifyContent: "center",
    },
    storyTitleText: {
      fontSize: RFValue(25),
      color: "white",
    },
    storyTitleTextLight: {
      fontSize: RFValue(25),
      color: "#2f345d",
    },
    storyAuthorTextLight: {
      fontSize: RFValue(18),
      color: "#2f345d",
    },
    storyAuthorText: {
      fontSize: RFValue(18),
      color: "white",
    },
    descriptionText: {
      fontSize: 13,
      color: "white",
      paddingTop: RFValue(10),
    },
    descriptionTextLight: {
      fontSize: 13,
      color: "#2f345d",
      paddingTop: RFValue(10),
    },
    actionContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: RFValue(10),
    },
    likeButton: {
      width: RFValue(160),
      height: RFValue(40),
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: "#eb3948",
      borderRadius: RFValue(30),
    },
    likeText: {
      color: "white",
      fontSize: RFValue(25),
      marginLeft: RFValue(5),
    },
  });