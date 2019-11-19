const Sequelize = require("sequelize");

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";

const db = new Sequelize(databaseUrl);

db.sync({ force: false }) // don't delete all the data
  .then(() => console.log("Database is connected"))
  .catch(console.error);

module.exports = db;
