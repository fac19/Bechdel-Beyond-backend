const db = require("./connection");
const path = require("path");
const fs = require("fs");

const initPath = path.join(__dirname, "init.sql");
const initSql = fs.readFileSync(initPath, "utf-8");

function build() {
  return db.query(initSql);
}

// Allows build to be ran on the command line, npm run setupdb will now run build()
if (require.main === module) build();

// Testing imports build but chooses when to run it
module.exports = build;
