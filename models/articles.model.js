const db = require("../db/connection");

exports.fetchArticles = () => {
  return db.query("SELECT * FROM articles").then(({ rows }) => {
    const endPoint = rows;
    return endPoint;
  });
};

exports.fetchArticleById = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id=$1", [article_id])
    .then(({ rows }) => {
      const endPoint = rows[0];
      return endPoint;
    });
};
