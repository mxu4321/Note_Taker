const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
// creates a unique id for each note
const { v4: uuidv4 } = require('uuid');
// const newNote = req.body;
// newNote.id = uuidv4();
// notes.push(newNote);


// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// POST /api/notes should receive a new note to save on the request body,
// add it to the db.json file, and then return the new note to the client.
router.post("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = uuidv4();
    notes.push(newNote);
    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notes),
      (err) => {
        if (err) throw err;
        res.json(newNote);
      }
    );
  });
});

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete.
router.delete("/notes/:id", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const noteId = req.params.id;
    // console.log(`noteId: ${noteId}`);
    const newNotes = notes.filter((note) => note.id !== noteId);
    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(newNotes),
      (err) => {
        if (err) throw err;
        res.json(newNotes);
      }
    );
  });
});

module.exports = router;
