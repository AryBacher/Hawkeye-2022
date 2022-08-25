//import { connection } from "../database.js";
import { Router } from 'express'
import { signUp, logIn } from "../../controllers/user.js";


const router = Router();

router.get('/images', (req, res) => {
    res.json({ "Hola": "Hola"})
})

router.post('/SignUp', signUp)

router.post('/LogIn',logIn)


export default router