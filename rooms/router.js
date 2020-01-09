const { Router } = require("express");
const Room = require("../rooms/model");
const User = require("../user/model");
const Question = require("../questions/model");
const auth = require("../auth/middleWare");

function factory(stream) {
  const router = new Router();

  router.post("/room", async (req, res, next) => {
    const { roomName, questions } = req.body;
    const room = await Room.create({ roomName });

    await Question.create({ question: questions.q1, roomId: room.id }); //=>
    await Question.create({ question: questions.q2, roomId: room.id }); //=>
    await Question.create({ question: questions.q3, roomId: room.id }); //=>
    await Question.create({ question: questions.q4, roomId: room.id }); //=>
    await Question.create({ question: questions.q5, roomId: room.id }); //=>

    const updated = await Room.findAll({ include: [User, Question] }); // include questions

    const action = {
      type: "ROOMS",
      payload: updated
    };

    const string = JSON.stringify(action);

    stream.send(string);

    res.send(room);
  });

  router.put("/join/:name", auth, async (req, res) => {
    const { user } = req;

    if (!user) {
      return next("No user found");
    }
    const { name } = req.params;
    const userToUpdate = await User.findByPk(req.user.dataValues.id);
    const room = await Room.findOne({ where: { roomName: name } });
    const updated = await userToUpdate.update({ roomId: room.id, iHave:null });
    const rooms = await Room.findAll({ include: [User, Question] }); 

    const action = {
      type: "ROOMS",
      payload: rooms
    };

    const string = JSON.stringify(action);

    stream.send(string);

    res.send(updated);
  });

  router.put("/choice/:name", auth, async (req, res, next) => {
    const { user } = req;
    const { name } = req.params;
    console.log(user);

    try {
      const room = await Room.findOne({
        where: { roomName: name },
        include: [User]
      });
      const users = room.users;

      const updated = await user.update(req.body);
      const rooms = await Room.findAll({ include: [User, Question] });
      const action = {
        type: "ROOMS",
        payload: rooms
      };

      const string = JSON.stringify(action);

      stream.send(string);
      res.send(updated);
    } catch (error) {
      next(error);
    }
  });


  router.put("/round/:name", auth, async (req, res, next) => {
    const { user } = req;
    const { name } = req.params;

    try {
      const room = await Room.findOne({
        where: { roomName: name },
        include: [User]
      });
      

    const updated = await room.increment('round');

      const rooms = await Room.findAll({ include: [User, Question] });
      const action = {
        type: "ROOMS",
        payload: rooms
      };

      const string = JSON.stringify(action);

      stream.send(string);
      res.send(updated);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = factory;

