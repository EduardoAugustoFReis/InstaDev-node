const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const upload = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      const randomString = crypto.randomBytes(8).toString("hex"); 

      cb(null, `${name}-${randomString}${ext}`)
    },
  })
}

module.exports = { upload };