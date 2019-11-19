const { Router } = require("express");
const { toJWT, toData } = require("./jwt");
const User = require("../user/model");
const bcrypt = require("bcrypt");

const router = new Router();
// creating a user account
router.post("/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  if (!userName || !password) {
    res.status(400).send({
      message: "Please supply a valid userName and password"
    });
  } else {
    User.findOne({
      where: {
        userName: req.body.userName
      }
    })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: "User with that userName does not exist"
          });
        } else if (bcrypt.compareSync(req.body.password, entity.password)) {
          //our solution is here
          // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          res.send({
            jwt: toJWT({ userId: entity.id })
          });
        } else {
          res.status(400).send({
            message: "Password was incorrect"
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: "Something went wrong"
        });
      });
  }
});
router.post("/signup", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  if (!userName || !password) {
    res.status(400).send({
      message: "Please supply a valid userName and password"
    });
  } else {
    User.findOne({
      where: {
        userName: req.body.userName
      }
    })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: "User with that userName does not exist"
          });
        } else if (bcrypt.compareSync(req.body.password, entity.password)) {
          // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          res.send({
            jwt: toJWT({ userId: entity.id })
          });
        } else {
          res.status(400).send({
            message: "Password was incorrect"
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: "Something went wrong"
        });
      });
  }
});
router.get("/secret-endpoint", (req, res) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      res.send({
        message: "Thanks for visiting the secret endpoint.",
        data
      });
    } catch (error) {
      res.status(400).send({
        message: Error`${error.name}: ${error.message}`
      });
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials"
    });
  }
});
module.exports = router;
