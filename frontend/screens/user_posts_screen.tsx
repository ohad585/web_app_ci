import React, { FC, useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, FlatList, TouchableHighlight ,Button} from "react-native"
import UserModel,{ UserCredentials } from "../model/user_model";
import PostModel,{Post} from "../model/post_model"

import ActivityIndicator from "./component/custom_activity_indicator"


const senderName=async (senderID:String)=>{
    return UserModel.getUserById(senderID)
}

const UserPostListRow: FC<{ post: Post, navigation: any,route: any,usrc:UserCredentials}> = ({ post  ,navigation,route,usrc}) => {
     const [userInfo,setUserInfo] = useState<UserCredentials>({_id:"",access_token:"",refresh_token:""});
    // React.useEffect(()=>{
    //     const usrc:UserCredentials = {
    //         _id:route.params.user._id,
    //         access_token:route.params.user.access_token,
    //         refresh_token:route.params.user.refresh_token
    //     }
    //     console.log(usrc);
    //     setUserInfo(usrc)
    //   },[route.params?.user])

    React.useEffect(()=>{
        const usrc:UserCredentials = {
            _id:route.params.user._id,
            access_token:route.params.user.access_token,
            refresh_token:route.params.user.refresh_token
        }
        console.log(usrc);
        setUserInfo(usrc)
    
      },[route.params?._id])

    const removePost = async (postID:String) =>{
        await PostModel.removePost(postID,userInfo.access_token);
        navigation.goBack()
     }

    return (
            <View style={styles.list_row_container}>
                { post.imageUrl != "" &&  <Image source={{uri: post.imageUrl.toString()}} style={styles.list_row_image}></Image>}
                { post.imageUrl == "" &&  <Image source={require("../assets/avatar.jpeg")} style={styles.list_row_image}></Image>}
                <View style={styles.list_row_text_container}>
                    <Text style={styles.list_row_senderID}>{post.senderID}</Text>
                    <Text style={styles.list_row_name}>{post.text}</Text>
                    <TouchableHighlight onPress={()=>navigation.navigate("Edit Post Screen",{post:post, user:usrc})}>
                        <Text>Edit Post</Text>
                        </TouchableHighlight>
                    <TouchableHighlight onPress={()=>removePost(post.postID)}>
                        <Text>Remove Post</Text>
                        </TouchableHighlight>

                </View>
            </View>
    )
}


const UserPosts: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [data, setData] = useState<Array<Post>>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userInfo,setUserInfo] = useState<UserCredentials>({_id:"",access_token:"",refresh_token:""});
    
    const getUser=async (userID:String)=>{
        const user = await UserModel.getUserById(userID)
        
        reloadData(user.email)
        
        return user
    }

    React.useEffect(()=>{
        const usrc:UserCredentials = {
            _id:route.params.user._id,
            access_token:route.params.user.access_token,
            refresh_token:route.params.user.refresh_token
        }
        console.log(usrc);
        setUserInfo(usrc)
        getUser(usrc._id)
      },[route.params?._id])

    // useEffect(()=>{
    //     navigation.addListener('focus',()=>{
    //        //var user=UserModel.getUserById(userInfo._id)
    //         reloadData(userInfo._id)
    //     })
    // },[userInfo])

    const reloadData = async (userID:String)=>{
        setIsLoading(true)
        console.log("ReloadData "+userID);
        
        const postData = await PostModel.getUserPosts(userID)
        console.log(postData);
        
        setData(postData)
        setIsLoading(false)
    }

    return (
        
        <View style={styles.home_container}>
            <FlatList
                data={data}
                keyExtractor={item => item.postID.toString()}
                renderItem={({ item }) => (<UserPostListRow usrc={userInfo} post={item} navigation={navigation} route={route} />)}
            ></FlatList>
            <View style={styles.activity_indicator}>
                <ActivityIndicator visible={isLoading}></ActivityIndicator>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    home_container: {
        flex: 1
    },
    list_row_container: {
        height: 150,
        flexDirection: "row",
        elevation: 4,
        borderRadius: 3,
        marginLeft: 8,
        marginRight: 8
    },
    list_row_image: {
        height: 130,
        width: 130,
        margin: 10,
        borderRadius: 15
    },
    list_row_text_container: {
        justifyContent: "center"
    },
    list_row_name: {
        fontSize: 30,
        marginBottom: 10
    },
    list_row_senderID: {
        fontSize: 25
    },
    activity_indicator:{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",      
        position: "absolute"
    }
})
export default UserPosts