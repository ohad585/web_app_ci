import { Request, Response } from "express";
import Message from "../models/message_model";


export const getAllMessages = async (req: Request, res: Response) => {
    console.log("getAllMessagess");
  
    try {
      const sender = req.query.sender;
      let messages;
      if (sender != null || sender != undefined) {
        messages = await Message.find({ sender: sender });
      } else {
        messages = await Message.find();
      }
      res.status(200).send(messages);
    } catch (err) {
      res.status(400).send({
        err: err.message,
      });
    }
};

export const createNewMessage = async (req: Request , res: Response) => {
    console.log(req.body);
    const sender = req.body.sender;
    const msg = new Message({
      message: req.body.text,
      sender: sender,
    });
  
    try {
      const newPost = await msg.save();
  
      console.log("New message saved");
      
      res.status(200).send({ sender: sender, message: req.body.text, _id: msg._id });
    } catch (err) {
      res.status(400).send({
        err: err.message,
      });
    }
  };

  
