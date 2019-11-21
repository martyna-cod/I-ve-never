const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../user/model");
const Question = require("../questions/model");

const Room = db.define("room", {
  roomName: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.belongsTo(Room);
Room.hasMany(User);
Question.belongsTo(Room);
Room.hasMany(Question);

module.exports = Room;
