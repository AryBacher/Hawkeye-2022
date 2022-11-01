import { Router } from 'express'
import { signUp, logIn, refreshToken, logOut, deleteUser, updateUsername,  sendEmail, authenticateUser } from "../controllers/user.js";

const router = Router();


router.post('/SignUp', signUp)

router.post('/LogIn', logIn)

router.get('/RefreshToken', refreshToken)

router.get('/LogOut', authenticateUser, logOut)

router.delete('/DeleteUser', deleteUser)

router.put('/UpdateUsername', updateUsername)

router.post('/SendEmail', sendEmail)

export default router