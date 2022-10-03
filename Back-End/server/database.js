import mysql from 'mysql2';

export const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: 'root',
    password: 'rootroot',
    database: process.env.DB_DATABASE,
});
 
connection.connect((err) => {
    if(err){
        console.log("El error de conexión es: " + err);
        return;
    }
    console.log("Tamos conectados a la base de datos");
})

//module.export(connection);
export default connection