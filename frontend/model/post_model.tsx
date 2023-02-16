import PostApi from "./post_api"
import { UserCredentials } from "./user_model";


export type Post = {
  postID: String;
  senderID:String;
  text: String;
  imageUrl: String;
};

const getUserPosts=async(UserID:String)=>{
  const posts= await PostApi.getUserPosts(UserID)
  return posts
};


const getAllPosts = async () => {
  const posts = await PostApi.getAllPosts()
  return posts
};

const addPost = async (p: Post,userC:UserCredentials) => {
  
  return await PostApi.addPost(p,userC)
};

const uploadImage = async (imageUri:String,userC:UserCredentials)=> {
  const url = await PostApi.uploadImage(imageUri,userC)
  return url
}
const updatePost = async (post: Post,usrc:UserCredentials) => {
  await PostApi.updatePost(post,usrc)
};

const removePost = async (postID: String,access_token:String) => {
  await PostApi.removePost(postID,access_token)
};

export default {
  getAllPosts,
  addPost,
  uploadImage,
  getUserPosts,
  updatePost,
  removePost
};
