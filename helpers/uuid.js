const { v4: uuidv4 } = require('uuid');
const newNote = req.body;
newNote.id = uuidv4();
notes.push(newNote);