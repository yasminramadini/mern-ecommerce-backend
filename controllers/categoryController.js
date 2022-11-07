const { Op } = require("sequelize");
const models = require("../models");
const Category = models.Category;
const generateSlug = require("../utils/generateSlug");

const getAll = async (req, res) => {
  try {
    const { keyword } = req.query;
    let categories;
    if (keyword) {
      categories = await Category.findAll({
        where: {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        order: [["id", "DESC"]],
      });
    } else {
      categories = await Category.findAll({
        order: [["id", "DESC"]],
      });
    }
    res.send(categories);
  } catch (e) {
    if (e.name === "SequelizeConnectionError") {
      return res.status(500);
    }
    console.log(e);
  }
};

const store = async (req, res) => {
  try {
    await Category.create({
      name: req.body.name,
      slug: generateSlug(req.body.name),
    });
    return res.send({ msg: "category saved" });
  } catch (e) {
    if (e.name === "SequelizeConnectionError") {
      return res.status(500);
    } else if (e.name === "SequelizeUniqueConstraintError") {
      const errors = e.errors.map((e) => e);
      res.status(400).send([{ field: errors[0].path, msg: errors[0].message }]);
    }
    console.log(e);
  }
};

const getById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    res.send(category);
  } catch (e) {
    if (e.name === "SequelizeConnectionError") {
      return res.status(500);
    }
  }
};

const update = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    category.name = req.body.name;
    category.slug = generateSlug(req.body.name);
    await category.save();
    res.send({ msg: "Category updated" });
  } catch (e) {
    if (e.name === "SequelizeConnectionError") {
      return res.status(500);
    } else if (e.name === "SequelizeUniqueConstraintError") {
      const errors = e.errors.map((e) => e);
      res.status(400).send([{ field: errors[0].path, msg: errors[0].message }]);
    }
    console.log(e);
  }
};

const destroy = async (req, res) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send({ msg: "Category deleted" });
  } catch (e) {
    if (e.name === "SequelizeConnectionError") {
      return res.status(500);
    }
    console.log(e);
  }
};

module.exports = {
  store,
  getAll,
  getById,
  update,
  destroy,
};
