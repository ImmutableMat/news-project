const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller");
const { getArticleById } = require("./controllers/articles.controller");
const { getArticlesWithCount } = require("./controllers/articles.controller");
const { getCommentsByArticleId } = require("./controllers/articles.controller");

const endpoints = require("./endpoints.json");
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticlesWithCount);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.get("/api", (request, response) => {
  response.status(200).send({ endpoints });
});

app.all("*", (request, response, next) => {
  response.status(404).send({ msg: "Not Found" });
});

app.use((err, request, response, next) => {
  if (err.status && err.msg) response.status(err.status).send({ msg: err.msg });
  else next(err);
});
app.use((err, request, response, next) => {
  if (err.code === "22P02") response.status(400).send({ msg: "Bad Request" });
});

app.use((err, request, response, next) => {
  console.log(err, "Unhandled Errors");
  response.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
