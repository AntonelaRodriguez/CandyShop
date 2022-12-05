const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes");
const setHeaders = require("./utils/middlewares/setHeaders");
const errorHandler = require("./utils/middlewares/errorHandler");

const app = express();
app.name = "API";

// Middlewares
app.use(cookieParser()); // Manejo de cookies.
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // Analiza solicitudes con cabecera "application/x-www-form-urlencoded" parseando el contenido del req.body con este tipo de contenido especificado a codigo JS.
app.use(express.json({ limit: "50mb" })); // Analiza solicitudes con cabecera "Content-Type: application/json" parseando el contenido del req.body con este tipo de contenido especificado a codigo JS.
app.use(morgan("dev")); // Pinta (registra) en consola detalles de cada solicitud HTTP realizada.
app.use(setHeaders);
app.use("/", routes);
app.use(errorHandler);

module.exports = app;
