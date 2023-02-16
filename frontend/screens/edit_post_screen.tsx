import React, { FC, useState } from "react";
import { View, Text ,StyleSheet ,Image, TextInput, TouchableHighlight, ScrollView} from "react-native";
import PostModel,{Post} from "../model/post_model"
import COLORS from "../constants/colors";
import ActivityIndicator from "./component/custom_activity_indicator";
import CustomImagePicker from "./component/custom_image_picker";
import { UserCredentials } from "../model/user_model";

const Edit_Post: FC<{ navigation: any; route: any,}> = ({navigation,route }) => {
    const [isLoading,setIsLoading] =useState<boolean>(false)
    const [postID,setPostID] = useState<String>("")
    const [senderID,setSenderID] = useState<String>("")
    const [firstsenderID,setFirstSenderID] = useState<String>("")
    const [text,setText] = useState<String>("")
    const [imageUrl,setImageUrl] = useState<String>("")
    const [userInfo,setUserInfo] = useState<UserCredentials>({_id:"",access_token:"",refresh_token:""});
    

    
    React.useEffect(()=>{
      const usrc:UserCredentials = {
          _id:route.params.user._id,
          access_token:route.params.user.access_token,
          refresh_token:route.params.user.refresh_token
      }
      console.log(usrc);
      setUserInfo(usrc)
      setPostID(route.params.post.postID)
      setSenderID(route.params.post.senderID)
      setFirstSenderID(route.params.post.text)
      setText(route.params.post.text)
      setImageUrl(route.params.post.imageUrl)
      console.log("Edit_post "+postID+" "+text);
      //getUser(usrc._id)
    },[route.params?.post])

    
    
    const onSave = async ()=>{
      setIsLoading(true)
      if(text!="" && imageUrl !="" ){
        const p:Post = {
          postID:postID,
          senderID:senderID,
          text:text,
          imageUrl: ''
        }
        if(imageUrl != ""){
          console.log("saving image")
          const url = await PostModel.uploadImage(imageUrl,userInfo)
          p.imageUrl = url
          console.log("saving image : " + url) 
      }
      
        await PostModel.updatePost(p,userInfo)
        setIsLoading(false)
        navigation.navigate("Home",{_id:userInfo._id,accessToken:userInfo.access_token,refreshToken:userInfo.refresh_token})
      }
    }

    const onImageSelected = (uri:String)=>{
      console.log("onImageSelected " + uri)
      setImageUrl(uri)
  }


    return (
      <ScrollView>
      <View style={styles.container}>
      <View style={styles.image} >
      <CustomImagePicker image={imageUrl} onImageSelected={onImageSelected}></CustomImagePicker>
      </View>
      <TextInput style={styles.textInput} onChangeText={setText} placeholder={firstsenderID.toString()} keyboardType="default"></TextInput>
      <TouchableHighlight underlayColor={COLORS.clickBackground} onPress={()=>{onSave()}} style={styles.button}>
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

  export default Edit_Post