import express from "express";
import { NextFunction, Request, Response } from "express";
const router = express.Router();
import authenticate from "../common/auth_middleware";

import multer from "multer"

const base = "http://192.168.0.100:3000/";
const profile_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profile/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg"); //Appending .jpg
  },
});
const post_storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/post/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + ".jpg"); //Appending .jpg
    },
  });
const upload_profile = multer({ storage: profile_storage });
const upload_post = multer({ storage: post_storage });

interface MulterRequest extends Request {
    file: any;
}

router.post(
  "/profile_file",
  upload_profile.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    //console.log(req.body)
    console.log("router.post(/file/profile: " + base + (req as MulterRequest).file.path);
    res.status(200).send({ url: base + (req as MulterRequest).file.path });
  }
);

router.post(
    "/post_file",
    upload_post.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
      //console.log(req.body)
      console.log("router.post(/file/post: " + base + (req as MulterRequest).file.path);
      res.status(200).send({ url: base + (req as MulterRequest).file.path });
    }
  );

// router.post('/:id',function (req, res, next) {
//     console.log("router.post id")
//     upload.single(req.params.id)
//     // req.file is the name of your file in the form above, here 'uploaded_file'
//     // req.body will hold the text fields, if there were any
//     console.log(req.file, req.body)
// });

export = router ;