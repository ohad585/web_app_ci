import React, { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableHighlight,
  Button,
} from "react-native";

import COLORS from "../constants/colors";
import LandingAnimation from "./component/custom_landing_animation";


const Landing: FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
    const signInOnClick = ()=>{
        navigation.navigate("Login")
    }

    const joinOnClick = ()=>{
        navigation.navigate("Register")
    }
  return (
    <View style={styles.home_container}>
        <LandingAnimation visible={true}></LandingAnimation>
        <TouchableHighlight style={[styles.button,{backgroundColor:"black",}]} onPress={()=>{signInOnClick()}}>
            <Text style={[styles.button_text,{color:"white"}]}>SIGN IN</Text>
        </TouchableHighlight>  
        <TouchableHighlight style={[styles.button,{backgroundColor:"white",}]} onPress={()=>{joinOnClick()}}>
            <Text style={[styles.button_text]}>JOIN</Text>
        </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  home_container: {
    flex: 1,
    justifyContent:"center",
    position:"relative",
    //marginLeft:"39%",
  },
  button:{
    textAlign:"center",
    //padding:8,
    margin:7,
    borderRadius:6,
    borderColor:"#BEBBBA",
    borderWidth:2
  },
  button_text:{
    textAlign:"center",
    fontSize:24,
    fontWeight:"bold",
    padding:8
  }
});

export default Landing;
