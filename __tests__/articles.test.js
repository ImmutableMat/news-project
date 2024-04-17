const request = require("supertest");
const testData = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const app = require("../app");
const db = require("../db/connection");
const endpointsData = require("../endpoints.json");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  db.end();
});

describe("Get/api", () => {
  test("Get 200: responds an endpoint of json data", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const endpoints = response.body.endpoints;
        expect(endpoints).toEqual(endpointsData);
      });
  });
});

test("Get 404: responds with an error message when endpoint is entered incorrectly", () => {
  return request(app)
    .get("/api/artivles")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("Not Found");
    });
});

describe("Get/api/articles/:article_id", () => {
  test("Get 200: return with an article object by it's article_id", () => {
    return request(app)
      .get("/api/articles/13")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(typeof article.article_id).toBe("number");
        expect(typeof article.title).toBe("string");
        expect(typeof article.topic).toBe("string");
        expect(typeof article.author).toBe("string");
        expect(typeof article.body).toBe("string");
        expect(typeof article.created_at).toBe("string");
        expect(typeof article.votes).toBe("number");
        expect(typeof article.article_img_url).toBe("string");
      });
  });

  test("Get 400: responds with error when passed a bad article_id", () => {
    return request(app)
      .get("/api/articles/ten")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid Input");
      });
  });
});