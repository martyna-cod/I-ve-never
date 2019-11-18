const express = require("express");
const userRouter = require("./user/router");
const bodyParser = require("body-parser");
const authRouter = require("./auth/router");
const roomRouter = require("./rooms/router");
const cors = require("cors");
//const Sse = require("json-sse");

const app = express();
//const stream = new Sse();

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
app.use(authRouter);
app.use(roomRouter);
// const streams = {};

// app.get("/stream", (req, res, next) => {
//   const rooms = Object.keys(messages);
//   const string = JSON.stringify(rooms);
//   stream.updateInit(string);
//   stream.init(req, res);
// });

// const messages = {}

// app.post("/message/:roomName", (req, res) => {
//     const { message } = req.body
//     const { roomName } = req.params
//     const room = message[roomName]

app.get("/", (req, res, next) => res.send("hello there"));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
