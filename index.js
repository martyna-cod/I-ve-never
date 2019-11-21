const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Sse = require("json-sse");
const authRouter = require("./auth/router");
const userRouter = require("./user/router");
const roomFactory = require("./rooms/router");
const questionRouter = require("./questions/router");
const Room = require("./rooms/model");
const User = require("./user/model");

const app = express();
const stream = new Sse();
const roomRouter = roomFactory(stream);

app.use(cors());
app.use(bodyParser.json());
app.use(authRouter);
app.use(userRouter);
app.use(roomRouter); ///======> roomFactory connect
app.use(questionRouter);

app.get("/stream", async (req, res, next) => {
  const rooms = await Room.findAll({ include: [User] });

  const action = {
    type: "ROOMS",
    payload: rooms
  };

  const string = JSON.stringify(action);

  stream.updateInit(string);
  stream.init(req, res);
});

app.get("/", (req, res, next) => res.send("hello there"));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));

//    const string = JSON.stringify(rooms);
//   stream.updateInit(string);a
//   stream.init(req, res);
// });

// const messages = {}

// app.post("/message/:roomName", (req, res) => {
//     const { message } = req.body
//     const { roomName } = req.params
//     const room = message[roomName]
// const streams = {};

// app.get("/stream", (req, res, next) => {
//   Room.findAll().then(rooms => {
//     const string = JSON.stringify(rooms);

//     stream.updateInit(string);
//     stream.init(req, res);
//   });
// });
