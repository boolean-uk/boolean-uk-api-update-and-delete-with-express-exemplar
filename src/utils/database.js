require('dotenv').config()
const { Client } = require("pg");

const connection = process.env.PGURL;

const db = new Client(connection);

module.exports = db;
