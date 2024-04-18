const {
  fetchArticleById,
  fetchArticlesWithCount,
} = require("../models/articles.model");

exports.getArticleById = (request, response, next) => {
  const { article_id } = request.params;
  fetchArticleById(article_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticlesWithCount = (request, response, next) => {
  fetchArticlesWithCount()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch(next);
};
