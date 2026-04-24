const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",       // tu usuario de PostgreSQL
  host: "localhost",      // servidor local
  database: "mystic_moon",// nombre de tu base
  password: "Andrea2005", // la que pusiste al instalar
  port: 5432,             // puerto por defecto
});

module.exports = pool;
