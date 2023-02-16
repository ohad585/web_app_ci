import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from "react-native";

import PostModel, { Post } from "../model/post_model";
import ActivityIndicator from "./component/custom_activity_indicator";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../constants/colors";
import UserModel,{ UserCredentials } from "../model/user_model";

const PostListRow: FC<{ post: Post; onItemClick: (id: String) => void }> = ({
  post,
  onItemClick,
}) => {

  console.log("PostListView "+post.imageUrl);
  
  return (
    <TouchableHighlight
      onPress={() => {
        onItemClick(post.postID);
      }}
      underlayColor={COLORS.clickBackground}
    >
      <View style={styles.list_row_container}>
        {post.imageUrl != "" && (
          <Image
            source={{ uri: post.imageUrl?.toString() }}
            style={styles.list_row_image}
          ></Image>
        )}
        {post.imageUrl == "" && (
          <Image
            source={require("../assets/avatar.jpeg")}
            style={styles.list_row_image}
          ></Image>
        )}
        <View style={styles.list_row_text_container}>
          <Text style={styles.list_row_id}>{post.senderID}</Text>
          <Text style={styles.list_row_name}>{post.text}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const Home: FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const TopBarAddButton: FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
      <TouchableHighlight
        onPress={() => {
          onClick();
        }}
        underlayColor={COLORS.clickBackground}
      >
        <Ionicons name={"add-outline"} size={40} color={"grey"} />
      </TouchableHighlight>
    );
  };

  const TopBarUserDetailsBtn: FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
      <TouchableHighlight
        onPress={() => {
          onClick();
        }}
        underlayColor={COLORS.clickBackground}
      >
        <Ionicons name={"person-circle-outline"} size={40} color={"grey"} />
      </TouchableHighlight>
    );
  };

  const [data, setData] = useState<Array<Post>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userId,setUserId] = useState<String>("")
  const [accessToken, setAccessToken] = useState<String>("");
  const [refreshToken, setRefreshToken] = useState<String>("");

  const openAddPost = () => {
    navigation.navigate("Add Post", {
      _id: route.params._id,
      accessToken: route.params.accessToken,
      refreshToken: route.params.refreshToken
    });
  };

  const openUserDetails = () => {
    console.log("OpenUserDetails " +route.params._id + " " + route.params.accessToken);
    
    navigation.navigate("User Details", {
      _id: route.params._id,
      accessToken: route.params.accessToken,
      refreshToken: route.params.refreshToken
    });
  };

  const getUser =async (id:String) => {

   const user =  await UserModel.getUserById(route.params._id)   
   console.log("getUser "+user.email);
   
  }


  React.useEffect(() => {
    
    setUserId(route.params._id)
    setAccessToken(route.params.accessToken);
    setRefreshToken(route.params.refreshToken)
    console.log("Got user "+route.params._id+" "+route.params.accessToken);
    
    getUser(userId)
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{flexDirection:"row"}}>
        <TopBarAddButton onClick={openAddPost}></TopBarAddButton>
        <TopBarUserDetailsBtn onClick={openUserDetails}></TopBarUserDetailsBtn>
        </View>
        )
      },
    });
    // navigation.setOptions({
    //     headerRight: () => {
    //       return <TopBarUserDetailsBtn onClick={openUserDetails}></TopBarUserDetailsBtn>;
    //     },
    //   });
  }, [route.params?._id]);

  const openPostDetails = (id: String) => {
    console.log("On press " + id);
  };
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      // screen is back in display
      console.log("screen in focus");
      reloadData();
    });
  }, [navigation]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      reloadData();
    });
  }, [navigation]);

  const reloadData = async () => {
    setIsLoading(true);
    const postData = await PostModel.getAllPosts();
    setData(postData);
    setIsLoading(false);
  };

  return (
    <View style={styles.home_container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.postID.toString()}
        renderItem={({ item }) => (
          <PostListRow post={item} onItemClick={openPostDetails} />
        )}
      ></FlatList>
      <View style={styles.activity_indicator}>
        <ActivityIndicator visible={isLoading}></ActivityIndicator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home_container: {
    flex: 1,
  },
  list_row_container: {
    height: 150,
    // width: "100%",
    // backgroundColor: "grey",
    flexDirection: "row",
    elevation: 4,
    borderRadius: 3,
    marginLeft: 8,
    marginRight: 8,
  },
  list_row_image: {
    height: 130,
    width: 130,
    margin: 10,
    borderRadius: 15,
  },
  list_row_text_container: {
    justifyContent: "center",
  },
  list_row_name: {
    fontSize: 30,
    marginBottom: 10,
  },
  list_row_id: {
    fontSize: 25,
  },
  activity_indicator: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
});
export default Home;