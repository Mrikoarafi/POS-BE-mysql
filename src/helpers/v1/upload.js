const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "src/uploads/v1");
  },
  // simpan file
  filename: (req, file, callback) => {
    // di split / pisah menggunakan titik di original name
    const ekstensi = file.originalname.split(".");

    // ambil fieldname di controllers & tanggal skrng agar foto tidak bentrok nama nya & ekstensi foto
    const namePict = `${file.fieldname}-${Date.now()}.${ekstensi[ekstensi.length - 1]}`;
    callback(null, namePict);
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 2000000, //2mb
  },
  fileFilter(req, file, callback) {
    if (file.originalname.match(/\.(JPG|jpg|JPEG|jpeg|png|PNG)\b/)) {
      callback(null, true);
    } else {
      callback("Image type must jpg or png", null);
    }
  },
});

module.exports = upload;
