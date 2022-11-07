require("dotenv").config();
const jwt = require("jsonwebtoken");

function checkLogin(req, res, next) {
  const token = req.header("authorization");
  jwt.verify(token, process.env.SECRET_KEY, (err) => {
    if (err) {
      return res.status(401).send({ msg: "Please login" });
    }
    return next();
  });
}

module.exports = checkLogin;
