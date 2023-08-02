const express = require('express'); //What about import?
const fs = require("fs"); //for access to the file system

const app = express();
const port = 3000;
const DATABASE = "./database.json"; //Where is our data stored?


// GET http://127.0.0.1:3000/  <-- route
//This is a CRUD app for a list of names.
app.get("/", (req, res) => {
    res.send('<html><body><p>See <a href="/api">/api</a></body></html>');
});

// ---Our API Enpoints ----------
// GET => Read the list of names.
app.get("/api", (req, res) => {
    const names = JSON.parse(fs.readFileSync(DATABASE));
    res.send(names);
});

// GET => READ a specific naem (i.e. details for one entry)
app.get('/api/:id', (req, res) => {
    const id = req.params.id;  //The id value that we're looking for.

    // 1. Read the "database.json" file.
    const names = JSON.parse(fs.readFileSync(DATABASE));

    // 2. We have to find the matching "id" value.
    for (const name of names) {
        if(name.id == id ) {
            res.send(name);
        }
    }
    res.status(404).send({ error: "item not found" });
});

// POST => CREATE a name
app.post('/api', (req, res) => {
    res.send({ message: 'TBD'});
});

// PUT => UPDATE a name
app.put('/api/:id', (req, res) => {
    res.send({ message: 'TBD'});
});
// DELETE => DELETE a name
app.delete("/api/:id", (req, res) => {
    res.send({ message: "TBD"});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});