const express = require("express");
const cors = require("cors");
const { Note } = require("./db");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const port = 2500;

app.use(cors());
app.use(express.json());

// Fetch all notes
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching notes", error });
  }
});

//sunny was here

// GET Note by ID
app.get("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching note", error });
  }
});



// DELETE Note by ID
app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID format" });
    }

    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }
    res.status(200).json({ msg: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting note", error });
  }
});





//POST new Note
app.post("/create", async (req, res) => {
  try {
    const { title, description } = req.body;

    const note = await Note.create({
      title: title,
      description: description,

    });

    res.status(200).json({
      msg: "success",
      title: note.title,
      description: note.description,
      _id: note._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
});



// UPDATE Note by ID
app.put("/notes/:id", async (req, res) => {
  try {
    const { title, description } = req.body; // New Data
    const noteId = req.params.id; // ID from URL

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ msg: "Invalid ID format" });
    }

    // Update Note
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, description }, // Data to update
      { new: true } // Return updated data
    );

    if (!updatedNote) {
      return res.status(404).json({ msg: "Note not found" });
    }

    res.status(200).json({
      msg: "Note updated successfully",
      updatedNote,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error updating note", error });
  }
});




app.listen(port, () => {
  console.log("server is running");
});
