import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});

export const uploadCloudinary = async (ruta) => {
  return await cloudinary.uploader.upload(ruta, 
  { resource_type: "video", 
    chunk_size: 6000000,
  })
}

export const deleteCloudinary = async (idVideo) => {
  await cloudinary.v2.uploader.destroy(idVideo);
}
