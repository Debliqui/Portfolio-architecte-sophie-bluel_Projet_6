const db = require("./../models")
const Works = db.works
const cloudinary = require("../config/cloudinary") // Import de la configuration Cloudinary
const fs = require("fs")
const path = require("path")

exports.findAll = async (req, res) => {
  const works = await Works.findAll({ include: "category" })
  return res.status(200).json(works)
}

exports.create = async (req, res) => {
  const title = req.body.title
  const categoryId = req.body.category
  const userId = req.auth.userId

  try {
    // Avec multer-storage-cloudinary, l'upload est déjà fait,
    // l'URL Cloudinary est directement disponible ici :
    const imageUrl = req.file.path

    // Création du nouveau work dans la base de données
    const work = await Works.create({
      title,
      imageUrl,
      categoryId,
      userId,
    })

    return res.status(201).json(work)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: new Error("Something went wrong") })
  }
}

exports.delete = async (req, res) => {
  try {
    await Works.destroy({ where: { id: req.params.id } })
    return res.status(204).json({ message: "Work Deleted Successfully" })
  } catch (e) {
    return res.status(500).json({ error: new Error("Something went wrong") })
  }
}
