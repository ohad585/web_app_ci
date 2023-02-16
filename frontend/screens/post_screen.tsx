import React, { FC, useState } from "react";
import { View, Text ,Image} from "react-native";

const PostDetails: FC<{ navigation: any; route: any }> = ({
    navigation,
    route,
  }) => {

    const [PostId ,setPostId] = useState<String>("")
    const [PostText ,setPostText] = useState<String>("")
    const [PostImg ,setPostImg] = useState<String>("")

    React.useEffect(()=>{
        if(route.params?.post){
            setPostId(route.params.post.id)
            setPostText(route.params.post.text)
            setPostImg(route.params.post.imageUrl)
        }
    })

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Author: {PostId}</Text>
        <Text>Text: {PostText}</Text>
        <View>
                {PostImg != "" &&  <Image source={{uri: PostImg.toString()}}></Image>}
                {PostImg == "" &&  <Image source={require("../assets/avatar.jpeg")} ></Image>}
                </View>
      </View>
    );
  };

  export default PostDetails