const express = require("express");
const db = require("./config/connection");
const PORT = process.env.PORT || 3001;

const router = require("./routes");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(router);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(` running on port ${PORT}!`);
  });
});
