module.exports = (req, res, next) => {
  try {
    const title = req.body.title?.trim()
    const categoryId = parseInt(req.body.category, 10)
    const userId = req.auth?.userId
    const imageUrl = req.file?.path

    if (!title || !title.length || !categoryId || !userId || !imageUrl) {
      return res.status(400).json({ error: "Missing or invalid fields" })
    }

    req.work = { title, categoryId, userId, imageUrl }
    next()
  } catch (error) {
    console.error("checkWork error:", error)
    return res.status(500).json({ error: "Server error during work check" })
  }
}
