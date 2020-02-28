const { query } = require("../db/index.js");

async function getPokemon() {
  const data = await query(`SELECT * FROM pokemon`);
  console.log(data);
  return data.rows;
}

async function getPokemonById(id) {
  const pokemon = await query(`SELECT * FROM pokemon WHERE pkdx_id=$1`, [id]);
  // return pokemon.find(item => item.pkdx_id == id);
  return pokemon.rows[0];
}

async function getPokemonByName(name) {
  const pokemon = await query(
    `SELECT * FROM pokemon WHERE name ILIKE '%' || $1 || '%'`,
    [name]
  );
  return pokemon.rows;
}

async function getPokemonBySearch(search) {
  const pokemon = await getPokemon();
  return pokemon.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
}

// async function getPokemonBySort(sort) {
//   const pokemon = await getPokemon();
//   return pokemon.sort(item => item.name.toLowerCase() == name.toLowerCase());
// }

async function savePokemon(pokemon) {
  const { pkdx_id, name, description, img_url, types, evolutions } = pokemon;
  const newPokemon = await query(
    `INSERT INTO pokemon (
      pkdx_id,
      name,
      description,
      img_url,
      types,
      evolutions) VALUES ($1,$2,$3,$4,$5,$6)`,
    [pkdx_id, name, description, img_url, types, evolutions]
  );
  return newPokemon;
}

async function deletePokemon(id) {
  const res = await query(`DELETE from pokemon WHERE id=$1 RETURNING name`, [
    id
  ]);
  if (res.rowCount) {
    return res.rows[0].name;
  } else {
    return undefined;
  }
}

async function updatePokemon(body, id) {
  const { pkdx_id, name, description, img_url, types, evolutions } = body;
  const res = await query(
    `UPDATE pokemon 
    SET pkdx_id = $1,
    name = $2,
    description = $3,
    img_url = $4,
    types = $5,
    evolutions = $6 
    WHERE id = $7 
    RETURNING name`,
    [pkdx_id, name, description, img_url, types, evolutions, id]
  );
  console.log(res.rows);
  return res.rows[0];
}

async function patchPokemon(body, id) {
  const { pkdx_id, name, description, img_url, types, evolutions } = body;
  const res = await query(
    `UPDATE pokemon SET 
  pkdx_id = COALESCE($1, pkdx_id), 
  name = COALESCE ($2, name), 
  description = COALESCE ($3, description), 
  img_url = COALESCE ($4, img_url),
  types = COALESCE ($5, types),
  evolutions = COALESCE ($6, evolutions)
  WHERE id = $7 
  RETURNING name`,
    [pkdx_id, name, description, img_url, types, evolutions, id]
  );
  return res;
}

module.exports = {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  getPokemonBySearch,
  savePokemon,
  deletePokemon,
  updatePokemon,
  patchPokemon
};
