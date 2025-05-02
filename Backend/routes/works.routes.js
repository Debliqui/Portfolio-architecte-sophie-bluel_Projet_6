const express = require("express")
const router = express.Router()

// Middlewares
const auth = require("../middlewares/auth")
const checkWork = require("../middlewares/checkWork")

// Multer avec stockage Cloudinary
const multer = require("multer")
const { storage } = require("../config/cloudinary")
const upload = multer({ storage })

// Contrôleur
const workCtrl = require("../controllers/works.controller")

// ROUTES
router.get("/", workCtrl.findAll)

router.post("/", auth, upload.single("image"), checkWork, workCtrl.create)

router.delete("/:id", auth, workCtrl.delete)

module.exports = router
