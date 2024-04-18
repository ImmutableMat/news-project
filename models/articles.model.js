const db = require("../db/connection");
// const articles = require("../db/data/test-data/articles");
// const comments = require("../db/data/test-data/comments");

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
      return rows[0];
    });
};

exports.fetchArticlesWithCount = () => {
  return db
    .query(
      `SELECT articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id ) AS comment_count FROM articles
  LEFT JOIN comments
  ON comments.article_id  = articles.article_id
  GROUP BY articles.article_id
  ORDER BY created_at DESC
  `
    )
    .then(({ rows }) => {
      return rows;
    });
};
