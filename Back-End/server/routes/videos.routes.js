import { Router } from 'express'
import { uploadVideo, deleteVideo, updateVideo, filterVideo, getVideo, getVideos, redirect, getUsername } from "../controllers/videos.js";
import { authenticateUser } from '../controllers/user.js';

const router = Router();

router.post('/UploadVideo', redirect, uploadVideo)

router.delete('/DeleteVideo/:idUsuario/:idCloudinary', authenticateUser, deleteVideo)

router.post('/UpdateVideo/:idUsuario/:idCloudinary', authenticateUser, updateVideo)

router.get('/FilterVideo/:idUsuario', authenticateUser, filterVideo)

router.get('/GetVideos/:idUsuario', getVideos)

router.get('/GetVideo/:idUsuario/:idCloudinary', authenticateUser, getVideo)

router.get('/GetUsername/:idUsuario', getUsername)

/*await fetch('http://localhost:5000/analyse', {
	method: 'post',
	body: JSON.stringify(path),
	headers: {'Content-Type': 'application/json'}
});
  const data = await response.json();
  console.log(data)
*/
export default router