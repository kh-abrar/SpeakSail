// const multer = require('multer');

// const storage = multer.diskStorage({
//   filename: function (req,file,cb) {
//     cb(null, file.originalname)
//   }
// });

// const upload = multer({storage: storage});

// module.exports = upload;

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;