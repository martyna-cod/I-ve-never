const { Router } = require("express");
const Room = require("../rooms/model");

const router = new Router();

router.post("/room", (req, res, next) => {
  const { roomName } = req.body;
  // const email = req.body.email
  // const password = req.body.password
  //
  if (roomName === "") {
    return res.status(400).send("Specify room name");
  }
  console.log(roomName);

  Room.create(req.body)
    .then(newRoom => res.json(newRoom))
    .catch(next);
});

module.exports = router;
