const app = require("./src/app.js");
const { conn } = require("./src/db");
const { Port } = require("./src/utils/config");

(async () => {
  try {
    //Sincronizo todos los modelos con la base de datos.
    await conn.sync({ force: true }); // { force: true } -> Elimina todos los registros. { alter: true } -> Modifica columnas de la tabla realizando cambios en los registros de tal manera que coincidan con el modelo.
    console.log("All models were synchronized successfully.");
    app.listen(Port, () => {
      console.log("Server listening at port", Port);
    });
  } catch (error) {
    console.log("Error:", error);
  }
})();
