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

describe("api error handling test suite", () => {
  test("GET /api/patients/:nhs_number - status:400, responds with an error message when passed wrong nhs_number", () => {
    return request(app)
      .get("/api/patients/notNhsNumber")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("GET /api/patients/:nhs_number - status:404, responds with an error message if nhs_number does not exist", () => {
    return request(app)
      .get("/api/patients/12345678")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Your details could not be found");
      });
  });
});

describe("JSON describing all the available endpoints this API - test suite", () => {
  test("GET /api returns an object containing all endpoint information", () => {
    return request(app)
      .get("/api")
      .then((response) => {
        expect(response.body.apiInfo.hasOwnProperty("GET /api")).toBe(true);
        expect(response.body.apiInfo["GET /api"]).toEqual({
          description:
            "serves up a json representation of all the available endpoints of the api",
        });
        expect(
          response.body.apiInfo.hasOwnProperty("GET /api/patients/{nhs_number}")
        ).toBe(true);
        expect(response.body.apiInfo["GET /api/patients/{nhs_number}"]).toEqual(
          {
            description:
              "serves an object of patient for the specified nhs number",
            queries: [],
            exampleResponse: {
              patient: {
                user_id: 1,
                nhs_number: 111222333,
                first_name: "DOE",
                surname_name: "John",
                age: 18,
                dob: "Jan 14",
              },
            },
          }
        );
        Object.keys(response.body.apiInfo).forEach((key) => {
          expect(typeof response.body.apiInfo[key]).toBe("object");
        });
      });
  });
});
