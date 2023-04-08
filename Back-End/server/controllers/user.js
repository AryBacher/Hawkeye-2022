import "dotenv/config";
import bcryptjs from "bcryptjs";
import { serialize } from "cookie";
import { pool } from "../database.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.passwordConfirm
  ) {
    return res.status(406).json({ message: "Datos incompletos" });
  }

  const { name, email, password, passwordConfirm } = req.body;

  if (password !== passwordConfirm) {
    return res.status(406).json({ message: "Las contraseñas no coinciden" });
  }

  const [user] = await pool.query(
    "SELECT email from usuarios WHERE email = ?",
    email
  );
  if (user.length !== 0) {
    console.log("El usuario ya existe");
    return res.status(406).json({ message: "El usuario ya existe" });
  }

  const passwordHash = await bcryptjs.hash(password, 8);
  await pool.query(
    "INSERT INTO usuarios (nombre, email, contrasenia) VALUES (?, ?, ?)",
    [name, email, passwordHash]
  );
  console.log("Usuario creado");
  return res.status(200).json({ message: "Usuario creado", redirect: true });
};

export const logIn = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(406).json({ message: "Datos incompletos" });
  }

  const { email, password } = req.body;

  const [user] = await pool.query(
    "SELECT id, nombre, contrasenia from usuarios WHERE email = ?",
    email
  );

  if (user.length === 0) {
    return res.status(406).json({ message: "Usuario inválido" });
  }
  const userId = user[0].id;

  const contraseñaCorrecta = await bcryptjs.compare(
    password,
    user[0].contrasenia
  );
  console.log(contraseñaCorrecta);

  if (contraseñaCorrecta) {
    const accessToken = generateAccessToken({ id: userId });

    const refreshToken = jwt.sign(
      { id: userId },
      process.env.REFRESH_TOKEN_SECRET
    );

    /*const serializedAccess = serialize('accessToken', accessToken, {
            httpOnly: true,
            expiresIn: 0,
            path: '/',
            sameSite: 'none',
            secure: true,
        })*/

    const serializedRefresh = serialize("refreshToken", refreshToken, {
      httpOnly: true,
      expiresIn: 0,
      path: "/",
      sameSite: "none",
      secure: true,
    });

    return res.setHeader("Set-Cookie", [serializedRefresh]).json({
      message: "Usuario logueado",
      redirect: true,
      idUsuario: userId,
      accessToken,
    });
  }
  return res.status(406).json({ message: "Contraseña incorrecta" });
};

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({ message: "Token no recibido" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ messsage: "Usuario no autorizado" });
    req.user = user;
    next();
  });
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
};

export const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken == null) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ id: user.id });

    /*const serializedAccess = serialize('accessToken', accessToken, {
        httpOnly: true,
        expiresIn: 0,
        path: '/',
    })*/

    return res.json({ message: "Access token refresheado", accessToken });
  });
};

export const updateUsername = async (req, res) => {
  const { name, email, password } = req.body;
  const [user] = await pool.query(
    "SELECT * from usuarios WHERE email = ?",
    email
  );
  if (user[0].email.length === 0) {
    return res.status(406)("No existe usuario con ese email");
  }

  const contraseñaCorrecta = await bcryptjs.compare(
    password,
    user[0].contraseña
  );

  if (contraseñaCorrecta) {
    await pool.query("UPDATE usuarios SET nombre = ? WHERE email = ?", [
      name,
      email,
    ]);
    return res.status(200).json({ message: "User updated" });
  }
  return res.status(406).json({ message: "Contraseña incorrecta" });
};

export const deleteUser = async (req, res) => {
  const { email } = req.body;
  const [emailUser] = await pool.query(
    "SELECT email from usuarios WHERE email = ?",
    email
  );

  if (emailUser[0].length === 0) {
    return res.status(406).json({ message: "No existe tal usuario" });
  }
  await pool.query("DELETE FROM usuarios WHERE email = (?)", email);
  return res.status(200).json({ message: "User deleted" });
};

export const logOut = (req, res) => {
  /*const serializedAccess = serialize('accessToken', null, {
        httpOnly: true,
        maxAge: 0,
        path: '/',
    })*/

  const serializedRefresh = serialize("refreshToken", null, {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });

  res.setHeader("Set-Cookie", [serializedRefresh]);
  return res.status(200).json({ message: "Usuario deslogueado" });
};

//Cors config

import allowedOrigins from "../config/allowedOrigins.js";

export const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

//Send email

import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
//import { HTMLContent } from '../mail/mail.js';

export const sendEmail = async (req, res) => {
  if (!req.body.email) {
    res.status(406).json({ message: "Datos incompletos" });
  }

  const { email } = req.body;
  const [existingEmail] = await pool.query(
    "Select email FROM usuarios WHERE email = ?",
    email
  );

  console.log(email);

  if (existingEmail.length === 0) {
    return res.status(406).json({ message: "No existe usuario con tal mail" });
  }

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL,
      pass: process.env.CONTRASENIA,
    },
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: "express-handlebars",
      viewPath: "../server/views",
    })
  );

  await transporter.sendMail({
    from: '"Hawkeye" <hawkeye.tennis.app@gmail.com>',
    to: email,
    subject: "Forgot password",
    template: "sendmail",
  });

  return res.status(200).json({ message: "Se ha enviado el mail con éxito" });
};
