import bcryptjs from "bcryptjs";
import { connection } from "../database";

export const createUser = async(req, res) =>{
    const user = req.body.user;
    let passwordHash = await bcryptjs.hash(pass, 8);
    //connection.query = ("INSERT INTO usuarios  ?" {nombre:user});
    return("User created");
}

export const updateUser = (req, res) =>{
    return("User updated");
}

export const deleteUser = (req, res) =>{
    return("user deleted");
}