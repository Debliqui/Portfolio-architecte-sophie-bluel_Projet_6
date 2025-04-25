const express = require("express")
const router = express.Router()
const multer = require("multer")
const { storage } = require("../config/cloudinary") // Utilisation du storage configuré pour Cloudinary
const upload = multer({ storage }) // Multer est configuré pour utiliser Cloudinary

const auth = require("../middlewares/auth")
const checkWork = require("../middlewares/checkWork")
const workCtrl = require("../controllers/works.controller")

router.post("/", auth, upload.single("image"), checkWork, workCtrl.create) // Upload de l'image
router.get("/", workCtrl.findAll)
router.delete("/:id", auth, workCtrl.delete)

module.exports = router
