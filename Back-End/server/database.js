import mysql from 'mysql2';

export const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
});

connection.connect((error) => {
    if(error){
        console.log("El error de conexión es: " + error);
        return;
    }
    console.log("Tamos conectados a la base de datos");
})

module.export(connection);