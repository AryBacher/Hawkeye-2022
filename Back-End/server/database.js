import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: 'root',
    password: 'rootroot',
    database: 'dbhawkeye',
});

pool.getConnection()
.then(() => { 
    console.log("Tamos conectados a la base de datos")
})
.catch((err) =>{
    console.log("No tamos conectados por el error: " +err)
})