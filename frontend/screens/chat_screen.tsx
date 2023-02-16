import React, { FC, useState,useEffect } from "react";
import { View, Text ,StyleSheet ,Image, TextInput, TouchableHighlight, ScrollView,FlatList,SafeAreaView } from "react-native";
import COLORS from "../constants/colors";
import {io} from "socket.io-client"
import LocalCache from "../model/local_cache";
import ImsModel, { Message } from "../model/ims_model";

const socket = io('http://192.168.0.100:3000')
var userEmail = ''


const SentMessage: FC<{payload:Message}> = ({ payload }) => {
  let view
  console.log("SentMessage from "+payload.sender +" me: "+ userEmail);
  
  if(payload.sender==userEmail){
    view =
       <View> 
    <Text style={styles.my_message_name}>{payload.sender}:</Text>
    <Text style={styles.my_message}>{payload.text}</Text>
    </View>
    }
    else{
    view =
    <View> 
    <Text style={styles.sent_message_name}>{payload.sender}:</Text>
    <Text style={styles.sent_message}>{payload.text}</Text>
    </View>
 }
    return view;
  };



/*   const MyMessage: FC<{Message:String}> = ({ Message }) => {
    return (
      <Text style={styles.my_message}>{Message}</Text>
    );
  };
 */

  const TextBox: FC<{}> = ({}) => {

    const sendMessage=(message:String)=>{
      console.log(message);
      ImsModel.saveMessage({sender:userEmail,text:message})
      setText("")
      socket.emit("ims:send_message",{
        to: "all",
        from: userEmail,
        message: message
    })
    }

    const [text,setText] = useState<String>("")
    return (
        <View style={styles.row }>
      <TextInput style={styles.TextBox} onChangeText={setText} placeholder={"Send text"} keyboardType="default"></TextInput>
    <TouchableHighlight onPress={()=> sendMessage(text.toString())}>
    <Image  style={styles.img } source={require("../assets/sentIMG.png")} ></Image>
    </TouchableHighlight>
    </View>

    );
  };

  
   const getUserEmail =async () => {
    const email = await LocalCache.getUserEmail()
    console.log("EMAIL "+ email?.toString());

    if(email!=null &&email !=undefined){
      userEmail = email
    }
  } 
  

  

const Chat: FC<{ navigation: any; route: any }> = ({ navigation, route }) => {


  const [data,setData] = useState<Array<Message>>([]);

  const getImsData =async () => {
    const imsData = await ImsModel.getAllMessages()
    setData(imsData)
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      getImsData();
      getUserEmail()
    });
  }, [navigation]);
  console.log("Socket starting");
  socket.on("connect_error", (err) => {
    //socket.auth.token = "abcd";
    console.log("connect_error "+err);

    socket.connect();
  });
  socket.on("connect", () => {
    console.log("client connected")
  });
  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });
  
  useEffect(() => {
    socket.on("ims:reciev_message", (data) => {
      console.log("Recived msg from socket "+data.from+" "+data.message);
      const msg:Message = {
        sender:data.from,
        text:data.message
      }
      setData((data) => [...data, msg]);
    });
  }, [socket]);

 
    return (
   
      <View  style={styles.container}>
   <View style={styles.top}>
        
        </View>
    <ScrollView  style={styles.body}>


 {/*  <View  > 
      <Text style={styles.my_message_name}>liro </Text>

       <Text style={styles.my_message}>my </Text>
       <Text style={styles.sent_message_name}>kkk </Text>

       <Text style={styles.sent_message}>they </Text>
       <Text style={styles.my_message}>my </Text>
       <Text style={styles.sent_message}>they </Text>
       <Text style={styles.my_message}>my </Text>
       <Text style={styles.sent_message}>they </Text>
       <Text style={styles.my_message}>my </Text>
       <Text style={styles.sent_message}>they </Text>
       <Text style={styles.my_message}>my </Text>
       <Text style={styles.sent_message}>they </Text>
       <Text style={styles.my_message}>my </Text>
       <Text style={styles.sent_message}>they </Text>
       <Text style={styles.my_message}>my </Text>
       <Text style={styles.sent_message}>they </Text>
       </View >  

 */}
 

   <FlatList
        data={data}
        keyExtractor={(item) => item.text.toString()}
        renderItem={({ item }) => (
          
          <SentMessage payload={item} />
        )}
        
      ></FlatList>  
      </ScrollView>

      <View  style={styles.footer}>
        <TextBox ></TextBox>
        </View>
    </View>

    )
    
}


const styles = StyleSheet.create({
  top:{
    paddingTop:100,
  },
    sent_message: {
      alignSelf: 'flex-end',
      borderWidth:3, 
       borderRadius: 10,
       width: 'auto',
      backgroundColor : "lightgrey",
      fontSize: 30,
      padding: 20,
      margin:15,
    },
    sent_message_name:{
      textAlign: "right",
      fontSize: 30,

    },

    my_message: {
      alignSelf: 'flex-start',
      borderWidth: 3, 
       borderRadius: 10,
       width: 'auto',
       backgroundColor : "powderblue",
        fontSize: 30,
        padding: 20,
        margin:15,
    },
    my_message_name:{
      alignSelf: 'flex-start',
      fontSize: 30,

    },

    TextBox:{
      fontSize: 20,
      margin:20,
        borderWidth:3,
        borderColor:"grey",
        color: 'black',
        height: 40,
        width:" 60%" ,


      },
      img:{
        alignSelf: 'flex-end',  
        margin:15,
        height: 60,
        width:100 ,
      },
      row: {
        flexDirection: "row",
      },
      container:{
        flex: 1,
        flexDirection: "column",

      },
      body:{
        paddingBottom:100,
        bottom:80,





      },
      footer:{
        position: 'absolute', //Here is the trick
       bottom:0,
       //backgroundColor:"yellow"

        
      
      }
});
export default Chat