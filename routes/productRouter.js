const express = require("express");
const checkLogin = require("../utils/checkLogin");
const {
  getAll,
  getById,
  getBySlug,
  getByCategory,
  store,
  update,
  destroy,
} = require("../controllers/productController");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "_" + file.originalname.replace(/\s/g, "_");
    cb(null, uniqueName);
  },
});
const upload = multer({ storage: storage });

const productRouter = express.Router();

productRouter.get("/", getAll);
productRouter.get("/:id", getById);
productRouter.get("/slug/:slug", getBySlug);
productRouter.get("/category/:category", getByCategory);
productRouter.post("/", checkLogin, upload.single("image"), store);
productRouter.put("/:id", checkLogin, upload.single("image"), update);
productRouter.delete("/:id", checkLogin, destroy);

module.exports = productRouter;
