import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});

export const uploadCloudinary = async (ruta) => {
  await cloudinary.v2.uploader
.upload(ruta, 
  { resource_type: "video", 
    chunk_size: 6000000,
     })
.then(result=>console.log(result));
}

export const deleteCloudinary = async (idVideo) => {
  await cloudinary.v2.uploader.destroy(idVideo);
}
