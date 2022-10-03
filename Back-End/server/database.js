import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: 'root',
    password: 'rootroot',
    database: process.env.DB_DATABASE,
});
 
/*connection.connect((err) => {
    if(err){
        console.log("El error de conexión es: " + err);
        return;
    }
    console.log("Tamos conectados a la base de datos");
})*/

pool.getConnection()
.then(() => {
    console.log("Tamos conectados a la base de datos")
})
.catch((err) =>{
    console.log("No tamos conectados por el error:" +err)
})

//module.export(connection);
export default connection