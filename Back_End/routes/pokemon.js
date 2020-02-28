const express = require("express");
const router = express.Router();
const {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  getPokemonBySearch,
  savePokemon,
  deletePokemon,
  updatePokemon,
  patchPokemon
} = require("../models/pokemon.js");

router.get("/pokemon", async (req, res) => {
  const { name, id, search } = req.query;
  if (name) {
    const namedPokemon = await getPokemonByName(name);
    res.json(namedPokemon);
    return;
  }
  if (id) {
    const idPokemon = await getPokemonById(id);
    res.json(idPokemon);
    return;
  }
  if (search) {
    const searchedPokemon = await getPokemonBySearch(search);
    res.json(searchedPokemon);
    return;
  }
  const pokemon = await getPokemon();
  res.json(pokemon);
});

router.get("/pokemon/:pokemonId", async (req, res) => {
  const { pokemonId } = req.params;
  const pokemon = await getPokemonById(pokemonId);
  res.json(pokemon);
});

router.get("/pokemon/:pokemonName", async (req, res) => {
  const { name } = req.query;
  const pokemon = await getPokemonByName(name);
  res.json(pokemon);
});

router.post("/pokemon", (req, res) => {
  const { body } = req;
  savePokemon(body);
  res.send(`You have saved a ${body} new pokemon`);
});

router.delete("/pokemon/:id", async (req, res) => {
  const { id } = req.params;
  const name = await deletePokemon(id);
  if (name) {
    res
      .status(200)
      .send(`You have deleted the pokemon ${name} with the id of ${id}`);
  } else {
    res.status(406).send(`There are no pokemon with that id to delete`);
  }
});

router.put("/pokemon/:id", async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  const result = await updatePokemon(body, id);
  res.json({
    success: true,
    message: `You have updated the pokemon with the id of ${id} so that is now called ${result.name}`
  });
});

router.patch("/pokemon/:id", async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  const result = await patchPokemon(body, id);
  res.json({
    success: true,
    message: `You have patched the pokemon with the id of ${id}`
  });
});

module.exports = router;
