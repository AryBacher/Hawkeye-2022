//import { connection } from "../database.js";
import { Router } from 'express'
import { signUp, logIn, authenticateUser, refreshToken, logOut } from "../controllers/user.js";
import {} from "../controllers/videos.js";

const router = Router();


router.post('/SignUp', signUp)

router.post('/LogIn', authenticateUser, logIn)

router.post('/RefreshToken', refreshToken)

router.delete('/LogOut',logOut)

export default router