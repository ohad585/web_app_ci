import UserModel from '../models/user_model'
import { Request,Response } from 'express'
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt'
import { use } from '../routes/post_routes';


/**
 * findUserById
 * @param req html request
 * @param res html respond
 * @returns User
 */
export const findUserById =async (req: Request, res: Response) => {
  
  const id = req.params._id;  
  console.log("FINDUSERBYID "+id);
  
  if (id == null || id == undefined) {
    return res.status(400).send({ err: "no id provided" });
  }

  try {
    const user = await UserModel.findById(id);
    if (user == null) {
      res.status(400).send({
        err: "user doesnot exists",
      });
    } else {
      console.log(user.email);
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(400).send({
      err: err.message,
    });
  }  
}



/**
 * findUserByEmail
 * @param req html request
 * @param res html respond
 * @returns User
 */
export const findUserByEmail =async (req: Request, res: Response) => {
    console.log("findUserByEmail id=" + req.params.id);
  const email = req.params.email;
  if (email == null || email == undefined) {
    return res.status(400).send({ err: "no email provided" });
  }

  try {
    const user = await UserModel.findById(email);
    if (user == null) {
      res.status(400).send({
        err: "user doesnot exists",
      });
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(400).send({
      err: err.message,
    });
  }
}



/**
 * EditUser
 * @param req html request
 * @param res html respond
 * @returns User
 */
 export const editUser =async (req: Request, res: Response) => {
  const oldEmail = req.body.oldEmail;
  const newEmail = req.body.newEmail;
  const password = req.body.passowrd
  const imageUri = req.body.imageUri
  const id = req.body.id

  console.log("edditing user " + req.body.oldEmail+" "+imageUri+" "+id);
if (oldEmail == null || oldEmail == undefined) {
  return res.status(400).send({ err: "no email provided" });
}

try {
  const user = await UserModel.findById(id);
  if (user == null) {
    console.log("User is null editUser")
    res.status(400).send({
      err: "user doesnot exists",
    });
  } else {
    user.email=newEmail
    console.log("TESTTTTT");
    
   
    user.imageUri=imageUri
    //const newUser = await user.update() 
    console.log("+++++ "+user._id);
    
    await UserModel.updateOne({"_id":user._id},{$set:{ 'imageUri':imageUri,'email':newEmail}})
    res.status(200).send({
      _id:user._id
    });
  }
} catch (err) {
  console.log("EditUser Error " +err);
  
  res.status(400).send({
    err: err.message,
  });
}
}





