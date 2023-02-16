import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Button ,Image, TouchableHighlight} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "./constants/colors";

import HomeScreen from "./screens/home_screen"
import LoginScreen from "./screens/login_screen"
import RegistrationScreen from "./screens/registration_screen"
import AddPostScreen from "./screens/add_post_screen"
import LandingScreen from "./screens/landing_screen";

import UserDetailsScreen from "./screens/user_details_screen"
import UserPostsScreen from "./screens/user_posts_screen"
import PostDetailsScreen from "./screens/post_screen"
import EditUserDetailsScreen from "./screens/edit_user_details"
import EditPostScreen from "./screens/edit_post_screen"
import ChatScreen from "./screens/chat_screen"
import io from "socket.io-client"





const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

//component of add post btn

const HomeStackScreen: FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  return (
    <HomeStack.Navigator>

      <HomeStack.Screen name="Landing" component={LandingScreen} options={{
        headerShown:false
      }}/>
      <HomeStack.Screen name="Home" component={HomeScreen} />

      <HomeStack.Screen name="Login" component={LoginScreen} />
      <HomeStack.Screen name="Register" component={RegistrationScreen} />
      <HomeStack.Screen name="Add Post" component={AddPostScreen} />
      <HomeStack.Screen name="User Details" component={UserDetailsScreen} />
      <HomeStack.Screen name="User Posts" component={UserPostsScreen} />
      <HomeStack.Screen name="Post Details" component={PostDetailsScreen} />
      <HomeStack.Screen name="Edit User Details" component={EditUserDetailsScreen} />
      <HomeStack.Screen name="Edit Post Screen" component={EditPostScreen} />
      <HomeStack.Screen name="Chat" component={ChatScreen} />


      

    </HomeStack.Navigator>
  );
};


const App: FC = () => {
  

  return (
    <NavigationContainer>
      
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "About") {
              iconName = focused? "information-circle": "information-circle-outline";
            } 
            else if (route.name === "HomeStack") {
              iconName = focused ? "home" : "home-outline";
            }
            else if (route.name === "Login") {
              iconName = focused ? "log-in-outline" : "log-in-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
        },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >

        <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{headerShown :false,title:"Home"}}></Tab.Screen>
       <Tab.Screen name="Chat" component={ChatScreen}></Tab.Screen>




      </Tab.Navigator>
    </NavigationContainer>
  );
};

//<Tab.Screen name="User Details" component={UserDetailsScreen}></Tab.Screen>


const styles = StyleSheet.create({

})


export default App;