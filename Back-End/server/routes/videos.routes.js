import { Router } from 'express'
import { uploadVideo, deleteVideo, updateVideo, filterVideo, getVideo, getVideos, redirect } from "../controllers/videos.js";
import { authenticateUser } from '../controllers/user.js';

const router = Router();

router.post('/UploadVideo', redirect, uploadVideo)

router.delete('/DeleteVideo/:idUsuario/:idCloudinary', authenticateUser, deleteVideo)

router.post('/UpdateVideo/:idUsuario/:idCloudinary', authenticateUser, updateVideo)

router.get('/FilterVideo/:idUsuario', authenticateUser, filterVideo)

router.get('/GetVideos/:idUsuario', getVideos)

router.get('/GetVideo/:idUsuario/:idCloudinary', authenticateUser, getVideo)

export default router