const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../user/model");

const Room = db.define("room", {
  roomName: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.belongsTo(Room);
Room.hasMany(User);

module.exports = Room;
