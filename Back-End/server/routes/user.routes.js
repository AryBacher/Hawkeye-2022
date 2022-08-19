//import { connection } from "../database.js";
import { Router } from 'express'

const router = Router();

router.get('/images', (req, res) => {
    res.json({ "Hola": "Hola"})
})

export default router