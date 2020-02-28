const { query } = require("../index.js");

async function createTable() {
  try {
    const res = await query(`
  CREATE TABLE IF NOT EXISTS pokemon (
    id SERIAL,
    pkdx_id INTEGER,
    name TEXT,
    description TEXT, 
    img_url TEXT, 
    types TEXT[],
    evolutions TEXT[],
    PRIMARY KEY(id)
  )
  `);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

createTable();
