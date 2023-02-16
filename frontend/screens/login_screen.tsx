import React ,{ FC, useState } from "react";
import { View, Text ,StyleSheet ,Image, TextInput, TouchableHighlight, ScrollView,Button} from "react-native";
import UserModle,{User} from "../model/user_model"
import COLORS from "../constants/colors";
import LocalCache from "../model/local_cache";
import GoogleLoginBtn from "./component/custom_google_login_button";




const Login: FC<{ navigation: any; route: any }> = ({
    navigation,
    route,
  }) => {
    const [isLoading,setIsLoading] =useState<boolean>(false)
    const [UserName,setUserName] = useState<String>("")
    const [Password,setPassword] = useState<String>("")

    const onLoginPress = async ()=>{
      console.log(UserName + " 4 " +Password );

      setIsLoading(true)
      const user:User ={
        email:UserName,
        password:Password,
        imageUri:""
      } 
      const usrC = await UserModle.loginUser(user)
      if(usrC==null){
        alert("Login failed")
      }else {
        LocalCache.saveUserEmail(UserName.toString())
        navigation.navigate("Home",{_id:usrC._id,accessToken:usrC.access_token,refreshToken:usrC.refresh_token})
      }
    }

    const googleLogin =async (accessToken:String)=>{
      const userInfo = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}`}
    })
      const data = await userInfo.json()
      console.log(data);
      const usr:User={
        email:data.email,
        password : "google",
        imageUri:data.picture
      }
      const usrC = await UserModle.addGoogleUser(usr)
      if(usrC==null){
        alert("Google Login failed")
      }else {
        LocalCache.saveUserEmail(data.email.toString())
        navigation.navigate("Home",{_id:usrC._id,accessToken:usrC.access_token,refreshToken:usrC.refresh_token})
      }
    }

    
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Login Page</Text>
        <TextInput style={styles.textInput} onChangeText={setUserName} placeholder="UserName" keyboardType="default"></TextInput>
        <TextInput style={styles.textInput} onChangeText={setPassword} placeholder="Password" keyboardType="default"></TextInput>
      
        <TouchableHighlight
        underlayColor={COLORS.clickBackground} 
        onPress={()=>{ 
          onLoginPress()
        }} 
        style={styles.button}>
         <Text style={styles.buttonText}>Login</Text>
       </TouchableHighlight>
       <Text style={{textDecorationLine:'underline'}}>Sign in with:</Text>
       <View style={styles.carriers_container}>
        <GoogleLoginBtn successHandler={googleLogin}></GoogleLoginBtn>
       </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container:{
      flex:1
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

    },
    carriers_container:{
      flexDirection:"row"
    }
})


  export default Login