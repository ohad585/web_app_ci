import { Request, Response } from "express";

import Post from "../models/post_model";
import { broadcastPostMessage } from "../socket_server"
import { CtrlReq, CtrlRes } from "../common/req_res_wrapper"
/**
 * Gets all the posts
 * @param {http request} req
 * @param {http response} res
 */
export const getAllPosts = async (req: Request, res: Response) => {
  console.log("getAllPosts");

  try {
    const sender = req.query.sender;
    let posts;
    if (sender != null || sender != undefined) {
      posts = await Post.find({ sender: sender });
    } else {
      posts = await Post.find();
    }
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send({
      err: err.message,
    });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  //console.log("getPostById id=" + req.params.id);
  const id = req.params.id;
  if (id == null || id == undefined) {
    return res.status(400).send({ err: "no id provided" });
  }

  try {
    const post = await Post.findById(id);
    if (post == null) {
      res.status(400).send({
        err: "post doesnot exists",
      });
    } else {
      res.status(200).send(post);
    }
  } catch (err) {
    res.status(400).send({
      err: err.message,
    });
  }
};

/**
 * Create new post
 * @param {Request} req
 * @param {Response} res
 */
export const createNewPost = async (req: Request | CtrlReq, res: Response | CtrlRes) => {
  console.log(req.body);
  const sender = req.body.sender;
  const post = new Post({
    message: req.body.text,
    sender: sender,
    imageUrl:req.body.imageUrl
  });

  try {
    const newPost = await post.save();

    console.log("New post saved");
    
    //send notification to all other users
    //broadcastPostMessage({ sender: sender, message: req.body.message, _id: post._id})
    res.status(200).send({ sender: sender, message: req.body.message, _id: post._id });
  } catch (err) {
    res.status(400).send({
      err: err.message,
    });
  }
};

export const deletePostById = async (req: Request, res: Response) => {
  console.log("deletePostById id=" + req.params.id);
  const id = req.params.id;
  if (id == null || id == undefined) {
    return res.status(400).send({ err: "no id provided" });
  }

  try {
    await Post.deleteOne({ _id: id });
    res.status(200).send();
  } catch (err) {
    res.status(400).send({
      err: err.message,
    });
  }
};


// const updatePostSenderById = async (req:Request, res:Response)=>{
//     console.log('updatePostById id=' + req.params.id)
//     const id = req.params.id
//     const update= req.body.update
//     if (id == null || id == undefined){
//         return res.status(400).send({'err':'no id provided'})
//     }

//     try{
//         await Post.updateOne({"_id":id},{$set:{ 'sender':update}})
//         res.status(200).send()
//     }catch(err){
//         res.status(400).send({
//             'err': err.message
//         })
//     }
// }

export const updatePostMessageById = async (req:Request, res:Response)=>{
  const text= req.body.text
  const id=req.body.postID
  const img = req.body.imageUri
  console.log("Updatepost "+text +" "+img);
  
  if (id == null || id == undefined){
    console.log("ID IS NULL");
    
      return res.status(400).send({'err':'no id provided'})
  }

  try{
      await Post.updateOne({"_id":id},{$set:{ 'message':text,"imageUrl":img}})
      res.status(200).send()
  }catch(err){
    console.log(err);
    
      res.status(400).send({
          'err': err.message
      })
  }
}
