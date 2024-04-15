const express = require("express");
const app = express();
const { getTopics } = require("./controllers/controller");

app.get("/api/topics", getTopics);

app.all("*", (request, response, next) => {
  response.status(404).send({ msg: "Not Found" });
});

app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
