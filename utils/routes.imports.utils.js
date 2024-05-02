const express = require("express");
const router = express();

const dbConfig = require("../configs/db");
const knex = require("knex");
const knexDb = knex(dbConfig);

const DB = process.env.DB;

module.exports = {
    express,
    router,
    knexDb,
    DB
  };
  