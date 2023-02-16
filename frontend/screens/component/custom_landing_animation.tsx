import LottieView from "lottie-react-native"
import { FC, useRef } from "react"

const LandingAnimation: FC<{visible: boolean}>=({visible}) =>{
    const animation = useRef(null);
    if(!visible){
        return null
    }else{

        return(
            <LottieView
            autoPlay
            loop
            source={require("../../animations/smiley-face.json")}
            ref={animation}
            style={{
                width:300,
                height:300,
                //flex:1
                alignSelf:"center"
            }}
            
            ></LottieView>
        )
    }
}

export default LandingAnimation