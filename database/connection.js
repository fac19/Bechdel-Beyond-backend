const pg = require("pg");
require("dotenv").config();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = db;
