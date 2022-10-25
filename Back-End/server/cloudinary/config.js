import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});

export const uploadCloudinary = async (ruta) => {
  console.log(ruta)
  return await cloudinary.uploader.upload(ruta, 
  { resource_type: "video", 
    chunk_size: 6000000,
  })
}

export const deleteCloudinary = async (idVideo) => {
  await cloudinary.v2.uploader.destroy(idVideo);
}

export const getThumbnail = async (urlVideo) => {

  String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
  }

  //return await cloudinary.url(urlVideo.jpg), {resource_type: 'image'}
  //return await cloudinary.url(urlVideo, {background: "blue", height: 300, width: 300, crop: "pad", resource_type: "image"})
  //return await cloudinary.video(urlVideo, { format: 'jpg' })
  var urlVideo = urlVideo.replaceAt(urlVideo.length - 3, 'j')
  var urlVideo = urlVideo.replaceAt(urlVideo.length - 2, 'p')
  var urlVideo = urlVideo.replaceAt(urlVideo.length -1, 'g')
  
  return urlVideo
}