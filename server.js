require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const authRouter = require("./routes/authRouter");
const salesRouter = require("./routes/salesRouter");

// configuration
app.use(helmet());
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/auth", authRouter);
app.use("/sales", salesRouter);

app.listen(process.env.PORT || 8080, () =>
  console.log(`Running server on port ${process.env.PORT}`)
);
