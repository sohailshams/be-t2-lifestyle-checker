const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET/api/patients/:nhs_number - test suite", () => {
  test("returns patient object", () => {
    const expectedResult = {
      user_id: 1,
      nhs_number: 111222333,
      first_name: "DOE",
      surname_name: "John",
      age: 18,
      dob: "Jan 14",
    };
    return request(app)
      .get("/api/patients/111222333")
      .expect(200)
      .then((response) => {
        expect(typeof response.body.patient.user_id).toBe("number");
        expect(typeof response.body.patient.nhs_number).toBe("number");
        expect(typeof response.body.patient.first_name).toBe("string");
        expect(typeof response.body.patient.surname_name).toBe("string");
        expect(typeof response.body.patient.age).toBe("number");
        expect(typeof response.body.patient.dob).toBe("string");
        expect(response.body.patient).toEqual(expectedResult);
      });
  });
});
