const models = require("../models");
const Product = models.Product;
const Category = models.Category;
const ImageUploadError = require("../errors/ImageUploadError");
const fs = require("fs/promises");
const path = require("path");
const generateSlug = require("../utils/generateSlug");
const { Op } = require("Sequelize");

const getAll = async (req, res) => {
  try {
    const { keyword } = req.query;
    let products;
    if (keyword) {
      products = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        order: [["id", "DESC"]],
        include: {
          model: Category,
          attributes: ["id", "name", "slug"],
          as: "category",
        },
      });
    } else {
      products = await Product.findAll({
        order: [["id", "DESC"]],
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name", "slug"],
          },
        ],
      });
    }
    res.send(products);
  } catch (e) {
    if (e.name === "SequelizeConnectionError") {
      return res.status(500);
    }
    console.log(e);
  }
};

const getById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(product);
  } catch (e) {
    if (e.name === "SequelizeConnectionError") {
      return res.status(500);
    }
    console.log(e);
  }
};

const store = async (req, res) => {
  try {
    const image = await checkImage(req.file);

    await Product.create({
      name: req.body.name,
      slug: generateSlug(req.body.name),
      categoryId: req.body.categoryId,
      price: req.body.price,
      stock: req.body.stock,
      discount: req.body.discount,
      description: req.body.description,
      image: image,
    });
    res.send({ msg: "Product saved" });
  } catch (e) {
    if (e.name === "SequelizeConnectionError") {
      return res.status(500);
    } else if (e instanceof ImageUploadError) {
      return res.status(400).send({ msg: e.message });
    }
    console.log(e);
  }
};

const getBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        slug: req.params.slug,
      },
      include: {
        model: Category,
        attributes: ["id", "name", "slug"],
        as: "category",
      },
    });
    res.send(product);
  } catch (e) {
    if (e.name === "SequelizeConnectionError") {
      return res.status(500);
    }
    console.log(e);
  }
};

const getByCategory = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: "category",
        where: {
          slug: req.params.category,
        },
      },
    });
    res.send(products);
  } catch (e) {
    if (e.name === "SequelizeConnectionError") {
      return res.status(500);
    }
    console.log(e);
  }
};

const update = async (req, res) => {
  try {
    let image = "";
    if (req.file !== undefined) {
      image = await checkImage(req.file);
      await fs.unlink(
        path.join(__dirname, "../public/images/", req.body.oldImage)
      );
    } else {
      image = req.body.oldImage;
    }
    const slug = generateSlug(req.body.name);

    const product = await Product.findByPk(req.params.id);
    product.name = req.body.name;
    product.slug = slug;
    product.categoryId = req.body.categoryId;
    product.price = req.body.price;
    product.discount = req.body.discount;
    product.description = req.body.description;
    product.stock = req.body.stock;
    product.image = image;
    await product.save();
    res.send({ msg: "Product updated" });
  } catch (e) {
    if (e.name === "SequelizeConnectionError") {
      return res.status(500);
    } else if (e instanceof ImageUploadError) {
      return res.status(400).send({ msg: e.message });
    }
    console.log(e);
  }
};

const destroy = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await fs.unlink(path.join(__dirname, "../public/images/", product.image));
    await product.destroy();
    res.send({ msg: "Product deleted" });
  } catch (e) {
    if (e.name === "SequelizeConnectionError") {
      return res.status(500);
    }
  }
};

async function checkImage(image) {
  if (!image) {
    throw new ImageUploadError("Image is required");
  }

  const validExt = ["image/jpg", "image/jpeg", "image/png"];
  if (!validExt.includes(image.mimetype)) {
    await fs.unlink(image.path);
    throw new ImageUploadError("Image must be in jpg, jpeg, or png");
  }

  if (image.size >= 1024 * 1024) {
    await fs.unlink(image.path);
    throw new ImageUploadError("Image size must be less than 1MB");
  }

  return image.filename;
}

module.exports = {
  getAll,
  getById,
  getBySlug,
  getByCategory,
  store,
  update,
  destroy,
};
