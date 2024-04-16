const express = require("express");
const app = express();
const { getTopics } = require("./controllers/controller");
const endpoints = require("./endpoints.json");
app.get("/api/topics", getTopics);

app.get("/api", (request, response) => {
  response.status(200).send({ endpoints });
});
app.all("*", (request, response, next) => {
  response.status(404).send({ msg: "Not Found" });
});

app.use((err, request, response, next) => {
  response.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
