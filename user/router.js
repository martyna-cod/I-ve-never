const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");

const router = new Router();

router.get("/user", async (req, res, next) => {
  const user = await User.findAll();
  res.send(user);
});

router.post("/user", async (req, res, next) => {
  const { userName, password } = req.body;
  if (userName === "" || password === "") {
    return res.status(400).send("Entry all inputs");
  }

  const newUser = await User.create({
    userName,
    password: bcrypt.hashSync(password, 10)
  });
  res.json(newUser);
});

module.exports = router;
