//import { connection } from "../database.js";
import { Router } from 'express'
import { filterVideo, uploadVideo, deleteVideo, updateVideo } from "../controllers/videos.js";

const router = Router();

router.post('/filterVideo', filterVideo)

router.post('/uploadVideo', uploadVideo)

router.post('/deleteVideo', deleteVideo)

router.post('/updateVideo', updateVideo)

export default router