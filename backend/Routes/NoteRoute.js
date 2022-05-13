const router = require("express").Router();

const {
  getaNote,
  CreateNote,
  getNoteById,
  UpdateNote,
} = require("../Controllers/NoteController");
const protect = require("../Middlewares/Auth");

router.get("/notes", getaNote);
router.post("/create", protect, CreateNote);
router.get("/:id", getNoteById).put("/:id",protect, UpdateNote);

module.exports = router;
