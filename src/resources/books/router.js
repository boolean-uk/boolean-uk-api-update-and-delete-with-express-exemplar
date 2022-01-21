const express = require("express");
const { createOne, getAll, getOneById, updateOneById, deleteOneById, getFictionBooks } = require("./controller");

const router = express.Router();

router.post("/", createOne);
router.get("/", getAll);

router.get("/:id(\\d+)", getOneById);
router.put("/:id(\\d+)", updateOneById);
router.delete("/:id(\\d+)", deleteOneById);

router.get("/fiction", getFictionBooks);


module.exports = router;