import { Router } from 'express'
import { filterVideo, uploadVideo, deleteVideo, updateVideo, sendVideo, redirect, getVideos, showVideo } from "../controllers/videos.js";

const router = Router();

router.post('ShowVideo', showVideo)

router.post('/GetVideo', getVideos)

router.get('/FilterVideo', filterVideo)

router.post('/UploadVideo', redirect, uploadVideo)

router.post('/DeleteVideo', deleteVideo)

router.post('/UpdateVideo', updateVideo)

router.post('AnalysedVideo', sendVideo)

export default router