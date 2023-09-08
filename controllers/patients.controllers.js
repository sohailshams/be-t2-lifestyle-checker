const { getPatientWithNhsNumber } = require("../models/patients.models");

exports.fetchPatientWithNhsNumber = (request, response, next) => {
  const nhsNumber = request.params.nhs_number;
  getPatientWithNhsNumber(nhsNumber)
    .then((patient) => {
      response.status(200).send({ patient: patient });
    })
    .catch(next);
};
