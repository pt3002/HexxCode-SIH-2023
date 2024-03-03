const mysql = require("mysql2");
const { db_port, host, database, password } = require("./configKeys");

const db = mysql.createPool({
    port: db_port,
    host: host,
    user: "root",
    password: password,
    database: database,
});

module.exports = db.promise();
