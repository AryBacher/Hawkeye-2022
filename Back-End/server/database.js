import mysql from "mysql2/promise";

export const pool = mysql.createPool(process.env.DATABASE_URL);

pool
  .getConnection()
  .then(() => {
    console.log("Tamos conectados a la base de datos");
  })
  .catch((err) => {
    console.log("No tamos conectados por el error: " + err);
  });
