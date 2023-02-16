import React, { FC, useReducer, useState } from "react";
import { View, Text, TouchableHighlight, Button,Image,StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditUserDetailsScreen from "../screens/edit_user_details"
import UserModel, {User} from "../model/user_model"
import { UserCredentials } from "../model/user_model";


const UserDetails: FC<{ navigation: any; route: any }> = ({
    navigation,
    route,
  }) => {
    const [userMail ,setUserMail] = useState<String>("")
    const [userPassword ,setUserPassword] = useState<String>("")
    const [userImgUri ,setUserImgUri] = useState<String>("")
    const [userInfo,setUserInfo] = useState<UserCredentials>({_id:"",access_token:"",refresh_token:""});

    const getUser =async (id:String) => {
      const user =  await UserModel.getUserById(route.params._id)   
      console.log("getUser "+user.email);
      setUserImgUri(user.imageUri.toString())
      setUserMail(user.email)
      setUserPassword(user.password)
     }

    React.useEffect(()=>{
      const usrc:UserCredentials = {
        _id:route.params._id,
        access_token:route.params.accessToken,
        refresh_token:route.params.refreshToken
      }
      console.log(usrc);
      setUserInfo(usrc)
      getUser(route.params._id)
    },[route.params?._id])
    
    const navigateToEditDetails = ()=>{
      navigation.navigate("Edit User Details",{
        email:userMail,
        password:userPassword,
        imgUri:userImgUri,
        accessToken:route.params.accessToken,
        refreshToken:route.params.refreshToken
      })
    }


    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
       
        <Text>user email: {userMail}</Text>
        <View>
        {userImgUri != "" && (
          <Image
            source={{ uri: userImgUri.toString() }}
            style={styles.list_row_image}
          ></Image>
        )}
        {userImgUri == "" && (
          <Image
            source={require("../assets/avatar.jpeg")}
            style={styles.list_row_image}
          ></Image>
        )}
        </View>
        <TouchableHighlight onPress={()=>navigation.navigate("Edit User Details",{user:userInfo})}>
          <Text>Edit My Details</Text>
          </TouchableHighlight>
        <TouchableHighlight onPress={()=>navigation.navigate("User Posts",{user:userInfo})}>
        <Text>My Posts</Text>     
        </TouchableHighlight>     
       
      </View>
    );
  };

  const styles = StyleSheet.create({
    list_row_image: {
      height: 130,
      width: 130,
      margin: 10,
      borderRadius: 15,
    },
  });

  export default UserDetails