import UserApi from "./user_api";

export type User = {
  email: String;
  password: String;
  imageUri: String;
};

export type UserCredentials = {
  access_token: String;
  refresh_token: String;
  _id: String;
};

const getAllUsers = async () => {
  const users = await UserApi.getAllUsers();
  return users;
};
const addUser = async (user: User) => {
  return await UserApi.addUser(user);
}; 
const addGoogleUser = async (usr: User) => {
  return await UserApi.addGoogleUser(usr);
};

const loginUser = async (user: User) => {
  console.log("user_model loginUser " + user.email + " " + user.password);
  return await UserApi.loginUser(user);
};
const uploadImage = async (imageUri: String,accessToken:String) => {
  console.log("User upload image ");
  return await UserApi.uploadImage(imageUri,accessToken);
};


const updateUser = async (user: User, oldEmail:String,accessToken:String,id:String) => {
  await UserApi.updateUser(user,oldEmail,accessToken,id)
};

const getUserById = async (id:String) => {
  return await UserApi.getuserById(id)
};


export default {
  getAllUsers,
  addUser,
  loginUser,
  uploadImage,
  addGoogleUser,
  updateUser,
  getUserById
};
