const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");

const router = new Router();

router.get("/user", async (req, res, next) => {
  const user = await User.findAll();
  res.send(user);

  // User.findAll()
  //   .then(user => res.send(user))
  //   .catch(next);
});

router.post("/user", async (req, res, next) => {
  const { userName, password } = req.body;
  // const userName = req.body.userName
  // const password = req.body.password
  //
  if (userName === "" || password === "") {
    return res.status(400).send("Entry all inputs");
  }
  console.log({ USER_NAME: userName, PASSWORD: password });

  const newUser = await User.create({
    userName, // => userName:userName
    password: bcrypt.hashSync(password, 10)
  });
  res.json(newUser);
  // User.create({ userName, password: bcrypt.hashSync(req.body.password, 10) }) // req.body.password is not necessary => just password
  //   .then(newUser => res.json(newUser))
  //   .catch(next);
});

module.exports = router;
