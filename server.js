const express = require('express');
const path = require('path');
const fs = require('fs');
let db = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//API routes
app.get('/api/notes', (req, res) =>{
  res.status(200).json(db);
});

app.post('/api/notes', (req, res) =>{
  console.log(req.body)
  req.body.id = uuidv4()
  console.log(req.body)
  db.push(req.body)
  fs.writeFile('./db/db.json', JSON.stringify(db), function(error){
    if (error) throw error
    res.status(200).json(db);
  })
});

app.delete('/api/notes/:id', (req, res) =>{
  console.log(req.params.id);
  db = db.filter(note => note.id !== req.params.id)
  console.log(db)
  fs.writeFile('./db/db.json', JSON.stringify(db), function(error){
    if (error) throw error
    res.status(200).json(db);
  })
})


app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
