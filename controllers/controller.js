const { fetchTopics } = require("../models/model");

exports.getTopics = (request, response, next) => {
  fetchTopics()
    .then((topics) => {
      response.status(200).send({ topics });
      //console.log({ topics });
    })
    .catch(next);
};
