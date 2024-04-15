const request = require("supertest");
const testData = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const app = require("../app");
const db = require("../db/connection");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  db.end();
});

describe("/api/topics", () => {
  test.only("Get 200: responds with an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        //console.log(body);
        const { topics } = body;
        expect(topics.length).toBe(3);
        topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });

  test.only("Get 404: responds with an error message when endpoint is entered incorrectly", () => {
    return request(app)
      .get("/api/topicss")
      .expect(404)
      .then(({ body }) => {
        console.log(body);
        expect(body.msg).toBe("Not Found");
      });
  });
});
