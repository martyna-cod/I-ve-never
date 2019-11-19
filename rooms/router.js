const { Router } = require("express");
const Room = require("../rooms/model");
const auth = require("../auth/middleWare");

function factory(stream) {
  const router = new Router();
  router.post("/room", async (req, res, next) => {
    const room = await Room.create(req.body);

    const action = {
      type: "ROOM",
      payload: room
    };

    const string = JSON.stringify(action);

    stream.send(string);

    res.send(room); //jsut for testing
  });

  router.put("/join/:name", auth, async (req, res) => {
    const { user } = req;

    console.log(auth);
    const { name } = req.params;
    // const room = await Room.findOne({ where: { roomName: name } });
    const updated = await user.update({ roomId: room.id });

    const room = await Room.findOne({ where: { roomName } });

    const rooms = await Room.findAll({ include: [User] });

    const action = {
      type: "ROOM",
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
