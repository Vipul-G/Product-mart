const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: './server/images',
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('_');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '_' + Date.now() + '.' + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const isValid = MIME_TYPE_MAP[file.mimetype]
  if (isValid) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports = multer({ storage, fileFilter }).fields([{name: 'productImages'}])
