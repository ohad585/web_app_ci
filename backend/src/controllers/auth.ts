import User from '../models/user_model'
import { Request,Response } from 'express'
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { RequestInfo, RequestInit } from 'node-fetch';

// const fetch = (url: RequestInfo, init?: RequestInit) =>
//   import('node-fetch').then(({ default: fetch }) => fetch(url, init));
/**
 * register
 * @param {http req} req
 * @param {http res} res
 */
 const register = async (req: Request, res: Response) => {
    console.log("register");
    //validate email/password
    const email = req.body.email;
    const password = req.body.password;
    const imageUri = req.body.imageUri;
    console.log("Saving user "+email+" "+password+" "+imageUri)
  
    if (
      email == null ||
      email == undefined ||
      password == null ||
      password == undefined
    ) {
      return res.status(StatusCodes.BAD_REQUEST).send({err:"email or passowrd not provided"});
    }
  
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
  
    //check if email is not already taken
    //save user in DB
    const user = new User({
      email: email,
      password: encryptedPassword,
      imageUri:imageUri
    });
    try {
      const newUser = await user.save();
      console.log("New user saved");
      
      //login - create access token
      const accessToken = await jwt.sign(
        { _id: newUser._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION }
      );
      const refreshToken = await jwt.sign(
        { _id: newUser._id },
        process.env.REFRESH_TOKEN_SECRET,
        {}
      );
      newUser.refreshToken = refreshToken;
      await newUser.save();
      console.log("New user saved with refresh and access tokens");

      res.status(StatusCodes.OK).send({
        access_token: accessToken,
        refresh_token: refreshToken,
        _id: newUser._id,
      });
    } catch (err) {
      return res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
    }
  };
  

/**
 * login
 * @param {http request} req 
 * @param {http response} res 
 */
 const login = async (req : Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('login '+email+" "+password)

    if (email == null || password == null) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "wrong email or password" });
    }
  
    try {
      // check password match
      const user = await User.findOne({ email: email });
      if (user == null) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "wrong email or password" });
      }
      console.log("Found user "+user.email+" "+user.passowrd);
      
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "wrong email or password" });
      }
  
      //calc accesstoken
      const accessToken = await jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION }
      );
      const refreshToken = await jwt.sign(
        { _id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        {}
      );
      user.refreshToken = refreshToken;
      await user.save();
      res.status(StatusCodes.OK).send({
        access_token: accessToken,
        refresh_token: refreshToken,
        _id: user._id,
      });
    } catch (err) {
      return res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
    }
};


/**
 * renewToken
 * get new access token by the refresh token
 * @param {http req} req
 * @param {http res} res
 */
 const renewToken = async (req: Request, res: Response) => {
    console.log("renewToken");
    // validate refresh token
    let token = req.headers["authorization"];
    if (token == undefined || token == null) {
      console.log("Token in null");
      
      return res.sendStatus(StatusCodes.FORBIDDEN);
    }
    token = token.split(" ")[1];
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userId) => {
      if (err != null) {
        console.log("Token not valid");
        
        return res.sendStatus(StatusCodes.FORBIDDEN);
      }
      req.body._id = userId;
  
      try {
        const user = await User.findById(userId);
        if (user.refreshToken != token) {
          console.log("Token dosent fit refreshToken");
          
          user.refreshToken = "";
          await user.save();
          return res.status(StatusCodes.FORBIDDEN).send({ error: err.message });
        }
        const accessToken = await jwt.sign(
          { _id: userId },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.TOKEN_EXPIRATION }
        );
        const refreshToken = await jwt.sign(
          { _id: userId },
          process.env.REFRESH_TOKEN_SECRET,
          {}
        );
        user.refreshToken = refreshToken;
        console.log("Renew success");
        
        await user.save();
        res.status(StatusCodes.OK).send({
          access_token: accessToken,
          refresh_token: refreshToken,
          _id: userId,
        });
      } catch (err) {
        return res.status(StatusCodes.FORBIDDEN).send({ error: err.message });
      }
    });
  };
  
  /**
   * test
   * @param {http req} req
   * @param {http res} res
   */
   const test = async (req: Request, res: Response) => {
    try {
      const user = await User.findById('6264049d42e3ad69d757be82')
      user.refreshToken = "sdfasd"
      await user.save()
      res.status(StatusCodes.OK).send({ test: 'adsfasd' });
  
    } catch (err) {
      return res.status(StatusCodes.FORBIDDEN).send({ error: err.message });
    }
  };
  
  /**
   * facebookLogin - called after a succesful login to facebook , the user is saved
   * to the DB(if not saved already) and assigned tokens .
   * @param req html request
   * @param res html response
   * @returns id,access_token,refresh_token
   */
  const googleLogin =async (req: Request, res: Response) => {
    console.log("Google login attempt");
    
    
    var email = req.body.email
    var picture = req.body.imageUri
    console.log("Google login attempt "+email);
    
    
    try{
      var user = await User.findOne({ email: email });
      if (user == null) {
        //save user to db
        user = new User({
            email:email,
            password:"google",
        })
        user = await user.save();  
      }
      //login - create access token
      const accessToken = await jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION }
      );
      const refreshToken = await jwt.sign(
        { _id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        {}
      );
      user.refreshToken = refreshToken;
      await user.save();
      res.status(StatusCodes.OK).send({
        access_token: accessToken,
        refresh_token: refreshToken,
        _id: user._id,
      });
    }catch(err){
      return res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
    }
    
  }

  export = {
    register,
    login,
    renewToken,
    test,
    googleLogin
  };
  

