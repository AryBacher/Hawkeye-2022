import bcryptjs from "bcryptjs";
import { connection } from "../database";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const signUp = async (req, res) =>{
    const {nombre, email, contraseña} = req.body.user;
    const user = await connection.query("SELECT * from usuarios WHERE nombre = ?", {nombre})
    if (user != null){
        res.sendStatus(406);
        return("El usuario ya existe");
    }
    const passwordHash = await bcryptjs.hash(contraseña, 8);
    connection.query = ("INSERT INTO usuarios (nombre, email, contraseña) VALUES (?,?,?)", {nombre, email, passwordHash});
    res.sendStatus(200);
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
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        res.json({ accessToken : accessToken, refreshToken : refreshToken});
        return ("Successful log in");
    }
    return("Contraseña incorrecta");
}

export const updateUser = async (req, res) =>{
    const {nombre, email, contraseña} = req.body.user;
    const emailUser = await connection.query("SELECT * from usuarios WHERE email = ?", {email})
    if (emailUser === null){
        return res.sendStatus(406)("No existe usuario con ese email");
    }
    const passwordHash = await bcryptjs.hash(contraseña, 8);
    connection.query = ("UPDATE usuarios SET (nombre, contraseña) = (?,?)", {nombre, passwordHash}, "WHERE email = (?)", {email});
    return res.sendStatus(200)("User updated");
}

export const deleteUser = async (req, res) =>{
    const {nombre} = req.body.user;
    const nombreUser = await connection.query("SELECT * from usuarios WHERE nombre = ?", {nombre})
    if (nombreUser === null){
        return res.sendStatus(406)("No existe usuario con ese nombre");
    }
    connection.query = ("DELETE FROM usuarios WHERE nombre = (?)", {nombre});
    return res.sendStatus(200)("User deleted");
}

export const authenticateUser = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next();
    });
}

export const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '30s'});
}

let refreshTokens = [];

export const refreshToken = (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return req.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)) return req.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
        if(err) return req.sendStatus(403)
        const accessToken = generateAccessToken({ name : user.name});
        res.json = {accessToken : accessToken};
    })
}

export const logOut = (req, res) => {
    refreshTokens = refreshTokens.filter (token => token !== req.body.token);
    res.sendStatus(204);
}