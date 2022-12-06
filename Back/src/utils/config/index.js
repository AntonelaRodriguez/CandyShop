require("dotenv").config(); //Acceso a variables de entorno (designadas en .env)

module.exports = {
  dbUser: process.env.DB_USER || "postgres",
  dbName: process.env.DB_NAME || "candyshop",
  dbPort: process.env.DB_PORT || 5432,
  dbHost: process.env.DB_HOST || "localhost",
  dbPassword: process.env.DB_PASSWORD || 1234,
  Port: process.env.PORT || 3001,
};
