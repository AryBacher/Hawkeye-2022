//import { connection } from "../database.js";
import { Router } from 'express'
import { filterVideo } from "../controllers/videos.js";

const router = Router();

router.post('/videos/upload', upload.array)

router.post('/filterVideo', filterVideo)

router.post('/UploadVideo', )

export default router