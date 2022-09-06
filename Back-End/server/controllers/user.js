import bcryptjs from "bcryptjs";
import { connection } from "../database";

export const createUser = async (req, res) =>{
    const {nombre, email, contraseña} = req.body.user;
    const user = await connection.query("SELECT * from usuarios WHERE nombre = ?", {nombre})
    if (user != null){
        return("El usuario ya existe");
    }
    const passwordHash = await bcryptjs.hash(contraseña, 8);
    connection.query = ("INSERT INTO usuarios (nombre, email, contraseña) VALUES (?,?,?)", {nombre, email, passwordhash});
    return("User created");
}

export const logIn = async (req, res) =>{
    const {nombre, contraseña} = req.body.user;
    const user = await connection.query("SELECT * from usuarios WHERE nombre = ?", {nombre})
    if (user == null){
        return("No existe usuario con ese nombre");
    }
    const passwordHash = await bcryptjs.hash(contraseña, 8);
    if (passwordHash === user.contraseña){
        return("Successful Log in");
    }
    return("Contraseña incorrecta");
}

export const updateUser = async (req, res) =>{
    const {nombre, email, contraseña} = req.body.user;
    const email = await connection.query("SELECT * from usuarios WHERE email = ?", {email})
    if (email === null){
        return("No existe usuario con ese email");
    }
    const passwordHash = await bcryptjs.hash(contraseña, 8);
    connection.query = ("UPDATE usuarios SET (nombre, contraseña) = (?,?)", {nombre, passwordhash}, "WHERE email = (?)", {email});
    return("User updated");
}

export const deleteUser = async (req, res) =>{
    const {nombre, email, contraseña} = req.body.user;
    const nombre = await connection.query("SELECT * from usuarios WHERE nombre = ?", {nombre})
    if (nombre === null){
        return("No existe usuario con ese nombre");
    }
    connection.query = ("DELETE FROM usuarios WHERE nombre = (?)", {nombre});
    return("User deleted");
}