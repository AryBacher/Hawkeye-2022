import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

pool.getConnection()
.then(() => { 
    console.log("Tamos conectados a la base de datos")
})
.catch((err) =>{
    console.log("No tamos conectados por el error: " +err)
})