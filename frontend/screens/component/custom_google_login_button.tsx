import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from '../../constants/colors';


WebBrowser.maybeCompleteAuthSession();

const GoogleLoginBtn:React.FC<{successHandler:(accessToken:String)=>void}> = ({successHandler})=> {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '508060421836-kd7fjltjf8v2o0l7dp6gltatke8rd8pa.apps.googleusercontent.com',
    androidClientId: "508060421836-94bm4uhg34q5po16kchuoqo91uhbhm29.apps.googleusercontent.com",
    iosClientId: "508060421836-mlugv1clgv1qpqai8uts7qhfb0tbfsg3.apps.googleusercontent.com",
  });

  
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log(response.authentication?.accessToken+" "+response.params)
      const accessToken = response.authentication?.accessToken
      successHandler(accessToken?.toString())
      }
  }, [response]);


  return(
    <TouchableHighlight onPress={()=>{promptAsync()}} underlayColor={colors.clickBackground}>
      <Ionicons name='logo-google' size={32}></Ionicons>
    </TouchableHighlight>
  )
}


export default GoogleLoginBtn