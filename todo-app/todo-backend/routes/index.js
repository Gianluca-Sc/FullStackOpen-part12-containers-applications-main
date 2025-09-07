const express = require("express");
const router = express.Router();

const configs = require("../util/config");
const { getAsync } = require("../redis/index.js");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get("/statistics", async (req, res) => {
  const addedTodos = await getAsync("added_todos");
  res.json({ added_todos: +addedTodos });
});

module.exports = router;
