const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");

const router = new Router();

router.get("/user", (req, res, next) => {
  User.findAll()
    .then(user => res.send(user))
    .catch(next);
});

router.post("/signup", (req, res, next) => {
  const { email, password } = req.body;
  // const email = req.body.email
  // const password = req.body.password
  //
  if (email === "" || password === "") {
    return res.status(400).send("Entry all inputs");
  }
  console.log(email, password);

  User.create({ email, password: bcrypt.hashSync(req.body.password, 10) })
    .then(newUser => res.json(newUser))
    .catch(next);
});

module.exports = router;
