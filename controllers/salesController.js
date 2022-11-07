const models = require("../models");
const Sales = models.Sales;
const SalesItem = models.SalesItem;
const Product = models.Product;
const Shipping = models.Shipping;

const getAll = async (req, res) => {
  try {
    const orders = await Sales.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.send(orders);
  } catch (e) {
    if (e.name === "SequelizeConnectionError") {
      return res.status(500);
    }
    console.log(e);
  }
};

const store = async (req, res) => {
  try {
    const newSales = await Sales.create({ userId: req.body.userId });

    await Shipping.create({
      salesId: newSales.id,
      name: req.body.shipping.name,
      address: req.body.shipping.address,
      phone: req.body.shipping.phone,
      city: req.body.shipping.city,
      province: req.body.shipping.province,
    });

    for (let i = 0; i < req.body.items.length; i++) {
      await SalesItem.create({
        salesId: newSales.id,
        productId: req.body.items[i].productId,
        price: req.body.items[i].productPrice,
        qty: req.body.items[i].qty,
        subtotal: req.body.items[i].subtotal,
      });
    }

    res.send({ msg: "Order saved" });
  } catch (e) {
    if (e.name === "SequelizeConnectionError") {
      return res.status(500);
    }
    console.log(e);
  }
};

const getById = async (req, res) => {
  try {
    const orders = await Sales.findAll({
      where: {
        userId: req.params.id,
      },
      include: [
        {
          model: SalesItem,
          attributes: ["qty", "price", "subtotal"],
          as: "items",
          include: [
            {
              model: Product,
              attributes: ["name", "price", "image"],
              as: "product",
            },
          ],
        },
      ],
    });
    res.send(orders);
  } catch (e) {
    if (e.name === "SequelizeConnectionError") {
      return res.status(500);
    }
    console.log(e);
  }
};

const update = async (req, res) => {
  try {
    const order = await Sales.findByPk(req.params.id);
    order.accepted = true;
    await order.save();
    res.send({ msg: "Order updated" });
  } catch (e) {
    if (e.name === "SequelizeConnectionError") {
      return res.status(500);
    }
    console.log(e);
  }
};

module.exports = {
  getAll,
  store,
  getById,
  update,
};
