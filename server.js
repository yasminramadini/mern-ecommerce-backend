import express from "express";
import morgan from "morgan";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);

app.get("/", (req, res) => {
  res.send({ msg: "hello world" });
});

app.listen(8080, () => console.log("Running server on port 8080"));
