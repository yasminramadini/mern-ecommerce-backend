require("dotenv").config();
const models = require("../models");
const bcrypt = require("bcryptjs");
const LoginError = require("../errors/LoginError");
const jwt = require("jsonwebtoken");
const User = models.User;

const register = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    await User.create({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
    });
    res.send({ msg: "Register successfully" });
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

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      throw new LoginError("Incorrect email or password");
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      throw new LoginError("Incorrect email or password");
    }

    // generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.send({ msg: "Login successfully", token, user });
  } catch (e) {
    if (e.name === "SequelizeConnectionError") {
      return res.status(500);
    } else if (e instanceof LoginError) {
      return res.status(400).send({ msg: e.message, field: "login" });
    }
    console.log(e);
  }
};

module.exports = {
  register,
  login,
};
