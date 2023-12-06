require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  db_port : process.env.DB_PORT,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.DATABASE,
  mongo_db : process.env.MONGO_DB
};
