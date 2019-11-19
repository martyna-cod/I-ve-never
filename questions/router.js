const { Router } = require("express");
const Question = require("../questions/model");

const router = new Router();

router.post("/question", (req, res, next) => {
  const { question } = req.body;
  // const email = req.body.email
  // const password = req.body.password
  //
  if (question === "") {
    return res.status(400).send("Specify question");
  }
  console.log(question);

  Question.create(req.body)
    .then(newQuestion => res.json(newQuestion))
    .catch(next);
});

module.exports = router;
