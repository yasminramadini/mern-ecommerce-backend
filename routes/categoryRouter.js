const express = require("express");
const categoryRouter = express.Router();
const {
  getAll,
  getById,
  store,
  update,
  destroy,
} = require("../controllers/categoryController");
const checkLogin = require("../utils/checkLogin");

categoryRouter.get("/", getAll);
categoryRouter.post("/", checkLogin, store);
categoryRouter.get("/:id", getById);
categoryRouter.put("/:id", checkLogin, update);
categoryRouter.delete("/:id", checkLogin, destroy);

module.exports = categoryRouter;
