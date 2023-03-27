const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const notes = require("./Develop/db/db.json");

const PORT = 3001;

const app = express();

app.listen(PORT, () => {
  console.log("Server listening at localhost: " + PORT);
});

// Add Middleware:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

// Get API db.json:
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/db/db.json"));
});

// Function to POST and add new note:
app.post("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSinc("./Develop/db/db.json"));
  const newNotes = req.body;
  newNotes.id = uuid.v4();
  notes.push(newNotes);
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notes));
  res.json(notes);
});

// To delete notes:
app.delete("api/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./Develop/db/db.json"));
  const deleteNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(deleteNote));
  res.json(deleteNote);
});

// call to HTML homepage:
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

// call to linked notes html page:
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

// Listen to Port:
app.listen(PORT, () => console.log("App listening at port: " + PORT));
