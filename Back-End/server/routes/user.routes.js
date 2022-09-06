//import { connection } from "../database.js";
import { Router } from 'express'
import { signUp, logIn } from "../controllers/user.js";


const router = Router();


router.post('/SignUp', signUp)

router.post('/LogIn',logIn)

router.delete('/LogOut',logOut)

export default router