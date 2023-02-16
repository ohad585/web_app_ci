import React, { FC, useState } from "react";
import { View, Text ,StyleSheet ,Image, TextInput, TouchableHighlight, ScrollView} from "react-native";
import UserModel,{User} from "../model/user_model"
import COLORS from "../constants/colors";
import ActivityIndicator from "./component/custom_activity_indicator";
import CustomImagePicker from "./component/custom_image_picker";
import { UserCredentials } from "../model/user_model";

const Edit_User: FC<{ navigation: any; route:any }> = ({navigation, route}) => {
    const [isLoading,setIsLoading] =useState<boolean>(false)
    const [UserName,setUserName] = useState<String>("")
    const [UserNameOld,setUserNameOld] = useState<String>("")
    const [Password,setPassword] = useState<String>("")
    const [imageUri,setImageUri] = useState<String>("")
    const [userId,setUserId] = useState<String>("");
    const [accessToken,setAccessToken] = useState<String>("")
    const [refreshToken,setRefreshToken] = useState<String>("")
    const [firstname,setFirstname] = useState<String>("")
    const getUser=async (userID:String)=>{
      const user = await UserModel.getUserById(userID)
      setUserName(user.email)
      setUserNameOld(user.email)
      setPassword(user.password)
      setImageUri(user.imageUri.toString())
      setFirstname(user.email)
      console.log("GETUSER "+user.imageUri);
      
      return user
  }
    React.useEffect(()=>{
      const usrc:UserCredentials = {
        _id:route.params.user._id,
        access_token:route.params.user.access_token,
        refresh_token:route.params.user.refresh_token
      }
      console.log(usrc);
        const user = getUser(usrc._id)
        setUserId(usrc._id)
        setAccessToken(usrc.access_token)
        setRefreshToken(usrc.refresh_token)
      
    },[route.params?.user])

    const onSave = async ()=>{
      setIsLoading(true)
      if(UserName!="" && Password !="" ){
        const user:User = {
          email:UserName,
          password:Password,
          imageUri: ''
        }
        if(imageUri != ""){
          console.log("saving image")
          const url = await UserModel.uploadImage(imageUri,accessToken)
          user.imageUri = url
          console.log("saving image : " + url) 
      }
      
        await UserModel.updateUser(user,UserNameOld,accessToken,userId)
        setIsLoading(false)
        navigation.navigate("Home",{_id:userId,accessToken:accessToken,refreshToken:refreshToken})
      }
    }




    const onImageSelected = (uri:String)=>{
      console.log("onImageSelected " + uri)
      setImageUri(uri)
  }
    return (
      <ScrollView>
      <View style={styles.container}>
      <View style={styles.image} >
        <CustomImagePicker image={imageUri} onImageSelected={onImageSelected}></CustomImagePicker>
      </View>
      <TextInput style={styles.textInput} onChangeText={setUserName} placeholder={firstname.toString()} keyboardType="default"></TextInput>
      <TouchableHighlight
        underlayColor={COLORS.clickBackground} 
        onPress={()=>{ 
          onSave()
        }} 
        style={styles.button}>
         <Text style={styles.buttonText}>Save</Text>
       </TouchableHighlight>

       
       <View style={styles.activity_indicator}>
        <ActivityIndicator visible ={isLoading}></ActivityIndicator> 
       </View>
      </View>
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
      container:{
        flex:1
      },
      image:{
        width:"100%",
        height:250,
        resizeMode:"contain",
      },
      textInput:{
        height:40,
        margin:12,
        borderWidth:1,
        padding:10,
        borderColor:"grey",
      },
      button:{
        margin:12,
        backgroundColor:"grey",
        borderRadius:50
      },
      buttonText:{
        fontSize:40,
        color:"white",
        textAlign: "center",
        marginTop:3,
        marginBottom:3
      },
      activity_indicator:{
        position:"absolute",
    justifyContent:"center",
    width:"100%",
    height:"100%",
    alignItems:"center"
      }
  })

  export default Edit_User