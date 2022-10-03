import multer from 'multer';

export const upload = multer({ dest: '../videos' })

router.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

router.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})

//Filtrar videos
export const filterVideo = async(req, res) => {
  const filtro = VARIABLEGLOBALFILTRO;
  const busqueda = req.body;
  const titulo = await connection.query("SELECT idVideo from videos WHERE "%filtro%" LIKE '"%busqueda%"'");
  res.json(titulo);
}