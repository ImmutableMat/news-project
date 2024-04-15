const db = require("../db/connection");
exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    //console.log(rows);
    const endPoint = rows;
    return endPoint;
  });
};
