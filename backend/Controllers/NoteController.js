const Note = require("../Models/NoteModel");
const notes = require("./notes");

const getaNote = async (req, res) => {
  res.json(notes);
};

const CreateNote = async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    res.status(400).json("Please Fill all the feilds");
    return;
  } else {
    const note = new Note({ user: req.user._id, title, body });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
};

const getNoteById = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
};

const UpdateNote = async (req, res) => {
  const { title, body } = req.body;

  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401).json("You can't perform this action");
  }

  if (note) {
    note.title = title;
    note.body = body;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404).json("Note not found");
  }
};

module.exports = { getaNote, CreateNote, getNoteById, UpdateNote };
