const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
const {
  fetchPatientWithNhsNumber,
} = require("./controllers/patients.controllers");
const { fetchApiInfo } = require("./controllers/endpoints.controllers");

app.get("/api", fetchApiInfo);
app.get("/api/patients/:nhs_number", fetchPatientWithNhsNumber);

app.use((err, request, response, next) => {
  // handle custom errors
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  }
  // handle specific psql errors
  else if (err.code === "22P02" || err.code === "42703") {
    response.status(400).send({ msg: "Bad Request" });
  } else {
    // if the error hasn't been identified,
    // respond with an internal server error
    console.log(err);
    response.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = app;
