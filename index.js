const express = require("express");
const userRouter = require("./user/router");
const bodyParser = require("body-parser");
const authRouter = require("./auth/router");

const app = express();
// const db = require("./db");
app.use(bodyParser.json());

app.use(userRouter);
app.use(authRouter);
app.get("/", (req, res, next) => res.send("hello there"));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
