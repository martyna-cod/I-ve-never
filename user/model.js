const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  iHave: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  }
});

module.exports = User;
