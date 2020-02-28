const express = require("express");
const cors = require("cors");
const pokemonRouter = require("./routes/pokemon");

const app = express();
const port = 5000;

app.use((req, res, next) => {
  console.log(`${req.method} request received to ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());

app.use(pokemonRouter);

// app.get("/pokemon", async (req, res) => {
//   const pokemon = await getPokemon();
//   res.json(pokemon);
// });

// app.get("/pokemon/:pokemonId", async (req, res) => {
//   const { pokemonId } = req.params;
//   const pokemon = await getPokemonById(pokemonId);
//   res.json(pokemon);
// });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
