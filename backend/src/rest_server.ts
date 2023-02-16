import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();

console.log("seerver is starting..");

import mongoose from "mongoose";
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("connected to mongo");
});

import bodyparser from "body-parser";
app.use(bodyparser.urlencoded({ extended: true, limit: "1mb" }));
app.use(bodyparser.json());

import post_routes from "./routes/post_routes";
app.use("/post", post_routes);

import auth_routes from "./routes/auth_routes";
app.use("/auth", auth_routes);

import user_routes from "./routes/user_routes"
app.use("/user",user_routes)

import file_route from "./routes/files_routes"
app.use("/file",file_route)

app.use("/uploads/post",express.static('uploads/post'))
app.use("/uploads/profile",express.static('uploads/profile'))

import message_route from "./routes/message_routes"
app.use("/msg",message_route)

// import swaggerUI from "swagger-ui-express";
// import swaggerJsDoc from "swagger-jsdoc";

// if (process.env.NODE_ENV == "development") {
//   const options = {
//     definition: {
//       openapi: "3.0.0",
//       info: {
//         title: "SCE 20222 simple REST backend API",
//         version: "1.0.0",
//         description: "A simple REST backend API with JWT authentication using refresh token",
//       },
//       servers: [{ url: "http://localhost:" + process.env.PORT }],
//     },
//     apis: ["./src/routes/*.ts"],
//   };
//   const specs = swaggerJsDoc(options);
//   app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
// }

import http from 'http';
const server = http.createServer(app);
export = server;