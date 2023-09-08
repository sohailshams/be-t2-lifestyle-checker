const request = require("supertest");
const app = require("../app.js");

describe("GET test suite", () => {
  test("GET - return welcome ", () => {
    return request(app)
      .get("/")
      .expect(200)
      .then((response) => {
        console.log(response.body);
      });
  });
});
