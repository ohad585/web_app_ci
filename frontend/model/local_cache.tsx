import AsyncStorage from '@react-native-async-storage/async-storage';


const saveUserEmail = async (email:string)=>{
    console.log("Saving email to local cache "+email);
    
    try {
        await AsyncStorage.setItem('email',email)
    } catch (error) {
        console.log(error);
    }
}
const getUserEmail = async () => {
    try{
        console.log("Getting email from local cache");
        
        const email = await AsyncStorage.getItem('email')
        console.log("Got "+email?.toString());
        
        if(email!==null){
            return email
        } else return null
    }catch(error){
        console.log(error);
    }
}

export default {getUserEmail,saveUserEmail}