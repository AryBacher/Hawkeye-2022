cloudinary.config({ 
    cloud_name: 'diywmrezx', 
    api_key: '453323677335541', 
    api_secret: 'Dmpx5AKGpbBHLpbaqHy4b7LMTvM' 
  });

  cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "no_se" }, 
  function(error, result) {console.log(result); });

  //ej resize
  cloudinary.image("sneaker.png", {crop: "scale", width: 150 })