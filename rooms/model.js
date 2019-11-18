const Sequelize = require("sequelize");
const db = require("../db");

const Room = db.define("room", {
  roomName: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Room;
