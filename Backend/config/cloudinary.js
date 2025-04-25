const cloudinary = require("cloudinary").v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = cloudinary.storage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio_images", // Ce paramètre permet de choisir un dossier dans Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // Formats d'image autorisés
  },
})

module.exports = { storage, cloudinary }
