const express = require("express");
const salesRouter = express.Router();
const {
  getAll,
  store,
  getById,
  update,
} = require("../controllers/salesController");
const checkLogin = require("../utils/checkLogin");

salesRouter.get("/", getAll);
salesRouter.get("/:id", getById);
salesRouter.post("/", checkLogin, store);
salesRouter.put("/:id", checkLogin, update);

module.exports = salesRouter;
