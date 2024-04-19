const {
  fetchArticleById,
  fetchArticlesWithCount,
  fetchCommentsByArticleId,
} = require("../models/articles.model");

exports.getArticleById = (request, response, next) => {
  const { article_id } = request.params;
  fetchArticleById(article_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticlesWithCount = (request, response, next) => {
  fetchArticlesWithCount()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (request, response, next) => {
  const { article_id } = request.params;
  fetchArticleById(article_id)
    .then(() => {
      return fetchCommentsByArticleId(article_id);
    })

    .then((comments) => {
      response.status(200).send({ comments });
    })

    .catch(next);
};
