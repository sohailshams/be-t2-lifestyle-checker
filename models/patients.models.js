const db = require("../db/connection.js");

exports.getPatientWithNhsNumber = (nhsNumber) => {
  return db
    .query("SELECT * FROM users WHERE users.nhs_number = $1;", [nhsNumber])
    .then(({ rows }) => {
      const patient = rows[0];
      console.log("model", patient);
      if (!patient) {
        return Promise.reject({
          status: 404,
          msg: "Your details could not be found",
        });
      }
      return patient;
    });
};
