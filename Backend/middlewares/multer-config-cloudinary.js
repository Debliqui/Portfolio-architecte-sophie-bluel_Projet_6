const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require("../config/cloudinary")

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio_images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) => file.originalname.split(" ").join("_"),
  },
})

module.exports = multer({ storage }).single("image")
