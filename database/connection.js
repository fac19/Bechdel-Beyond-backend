const pg = require("pg");
require("dotenv").config();

if (process.env.DATABASE_URL) {
  console.log("connected to remote")
} else {
  console.log("connected to local")
}
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = db;
