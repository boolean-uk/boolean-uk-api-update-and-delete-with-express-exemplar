const express = require("express");
const { createOne, getAll, getOneById, getFictionBooks } = require("./controller");

const router = express.Router();

router.post("/", createOne);
router.get("/", getAll);
router.get("/:id(\\d+)", getOneById);
router.get("/fiction", getFictionBooks);

module.exports = router;