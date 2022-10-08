import { Router } from 'express'
import { signUp, logIn, refreshToken, logOut, deleteUser, updateUsername,  sendEmail } from "../controllers/user.js";

const router = Router();


router.post('/SignUp', signUp)

router.post('/LogIn', logIn)

router.post('/RefreshToken', refreshToken)

router.post('/LogOut', logOut)

router.delete('/DeleteUser', deleteUser)

router.put('/UpdateUsername', updateUsername)

router.post('/SendEmail', sendEmail)

export default router