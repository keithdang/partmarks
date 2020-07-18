const { Pool } = require("pg");
const databaseConfiguration = require("../config/keys");

const pool = new Pool(databaseConfiguration);

module.exports = pool;
