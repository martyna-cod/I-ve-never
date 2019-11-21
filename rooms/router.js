const { Router } = require("express");
const Room = require("../rooms/model");
const User = require("../user/model");
const Question = require("../questions/model");
const auth = require("../auth/middleWare");

function factory(stream) {
  const router = new Router();

  router.post("/room", async (req, res, next) => {
    console.log({ Matiassssssssssssss: req.body });
    const { roomName, questions } = req.body;
    const room = await Room.create({ roomName });
    console.log(questions); //=>

    await Question.create({ question: questions.q1, roomId: room.id }); //=>
    await Question.create({ question: questions.q2, roomId: room.id }); //=>
    await Question.create({ question: questions.q3, roomId: room.id }); //=>
    await Question.create({ question: questions.q4, roomId: room.id }); //=>
    await Question.create({ question: questions.q5, roomId: room.id }); //=>

    const updated = await Room.findAll({ include: [User, Question] }); // include questions

    console.log("updated test:", updated);

    const action = {
      type: "ROOMS",
      payload: updated
    };

    const string = JSON.stringify(action);

    stream.send(string);

    res.send(room); //jsut for testing
  });

  router.put("/join/:name", auth, async (req, res) => {
    //console.log({ user: req.user });
    const { user } = req;

    //console.log(auth);

    if (!user) {
      return next("No user found");
    }
    const { name } = req.params;
    const userToUpdate = await User.findByPk(req.user.dataValues.id);
    console.log({ USER: userToUpdate });
    const room = await Room.findOne({ where: { roomName: name } });

    const updated = await userToUpdate.update({ roomId: room.id });

    //const room = await Room.findOne({ where: { roomName: name } });

    const rooms = await Room.findAll({ include: [User, Question] }); // include questions

    const action = {
      type: "ROOMS",
      payload: rooms
    };

    const string = JSON.stringify(action);

    stream.send(string);

    res.send(updated);
  });

  return router;
}

module.exports = factory;

//   const { roomName } = req.body;
//   // const email = req.body.email
//   // const password = req.body.password
//   //
//   if (roomName === "") {
//     return res.status(400).send("Specify room name");
//   }
//   console.log(roomName);

//   return router

// const router = new Router();

// router.post("/room", (req, res, next) => {
//   const { roomName } = req.body;
//   // const email = req.body.email
//   // const password = req.body.password
//   //
//   if (roomName === "") {
//     return res.status(400).send("Specify room name");
//   }
//   console.log(roomName);

//   Room.create(req.body)
//     .then(newRoom => res.json(newRoom))
//     .catch(next);
// });
