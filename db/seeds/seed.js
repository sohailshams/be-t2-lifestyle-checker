const format = require("pg-format");
const db = require("../connection");

const seed = ({ userData }) => {
  return db
    .query(`DROP TABLE IF EXISTS users;`)
    .then(() => {
      return db.query(`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        nhs_number INT DEFAULT 0 NOT NULL,
        first_name VARCHAR NOT NULL,
        surname_name VARCHAR NOT NULL,
        age INT DEFAULT 0 NOT NULL,
        dob VARCHAR NOT NULL
      );`);
    })
    .then(() => {
      const insertUsersQueryStr = format(
        "INSERT INTO users ( nhs_number, first_name, surname_name, age, dob) VALUES %L;",
        userData.map(({ nhs_number, first_name, surname_name, age, dob }) => [
          nhs_number,
          first_name,
          surname_name,
          age,
          dob,
        ])
      );

      return db.query(insertUsersQueryStr);
    });
};

module.exports = seed;
