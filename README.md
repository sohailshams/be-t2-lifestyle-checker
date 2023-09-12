# T2 Lifestyle Checker API Backend

- [Live Endpoints Link](https://t2-lifestyle.onrender.com/api/)
- [GitHub Repo](https://github.com/sohailshams/be-t2-lifestyle-checker)

## Project Description

This project **(API's)** are build for the purpose of accessing application data programmatically. This backend provides following information to the front end architecture;

1.  An individual patient data on providing correct nhs number

## Technologies Used

- [Node JS](https://nodejs.org/en)
- [Express JS](https://expressjs.com/) used to setup server.
- [dotenv](https://www.npmjs.com/package/dotenv) used to load environment variables from a .env into process.env.
- [PostgreSQL](https://www.postgresql.org/) used in development.
- [ElephantSQL](https://www.elephantsql.com/) used in production.
- [PostgreSQL Format](https://www.npmjs.com/package/pg-format) used to safely create dynamic SQL queries.
- [Jest](https://jestjs.io/) is used for writing tests.
- [GitHub](https://github.com/) used for version control.
- [Render](https://www.render.com/) used as hosting platform to deploy this project endpoints.
- [VS Code](https://code.visualstudio.com/) used as code editor.

## Local Deployment

To run this project locally, first fork this [repo](https://github.com/sohailshams/be-t2-lifestyle-checker) and clone to your local machine.

### Environment Variables

Next, create environment variables as below;

- Create **.env.test** file and add **PGDATABASE=t2_lifestyle_checker_test** in it.
- Create **.env.development** file and add **PGDATABASE=t2_lifestyle_checker** in it.
- Now run **npm install**

### Seed Databases

There are two databases included with this project, test database and developemt database. Please run following commands to seed databases;

- **npm run setup-dbs**
- **npm run seed**

### Disclaimer

This project is for learning purposes only.
