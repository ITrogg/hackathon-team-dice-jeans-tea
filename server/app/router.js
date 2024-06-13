const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
const client = require("../database/client");
// Import itemActions module for handling item-related operations
const itemActions = require("./controllers/itemActions");

// Route to get a list of items
router.get("/items", itemActions.browse);

// Route to get  specifics item by ID
router.get("/planetes/:id", (req, res) => {
  const wantedId = req.params.id;
  client
    .query(
      "SELECT ch.*, pl.name AS planet_name, pl.type, pl.description, pl.inhabitant, pl.image AS planet_image FROM characters AS ch INNER JOIN planets AS pl ON ch.planet_id = pl.id WHERE ch.planet_id = ?",
      [wantedId]
    )
    .then((characters) => {
      if (characters[0].length > 0) {
        res.status(200).json(characters[0]);
      } else {
        res.status(404).json({ name: "Character not found" });
      }
    })
    .catch((error) => console.error(error));
});

// Route to add a new item
router.post("/items", itemActions.add);

/* ************************************************************************* */

module.exports = router;
