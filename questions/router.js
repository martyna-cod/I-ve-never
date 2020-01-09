const { Router } = require("express");
const Question = require("../questions/model");

const router = new Router();

router.post("/question", (req, res, next) => {
  const { questions } = req.body;

  if (questions === "") {
    return res.status(400).send("Specify question");
  }

  Question.create(req.body.questions.q1) 
    .create(req.body.questions.q2)
    .create(req.body.questions.q3)
    .create(req.body.questions.q4)
    .create(req.body.questions.q5)
    .then(Questions => res.json(Questions))
    .catch(next);
});

router.get("/question", (req, res, next) => {
  Question.findAll().then(resp => res.send(resp));
});

module.exports = router;
