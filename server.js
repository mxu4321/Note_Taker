// import modules and files
const express = require("express");
// const fs = require("fs");
const router = require("./routes");
// const path = require("path");

const PORT = process.env.PORT || 3001;


const app = express();   

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// Middleware for serving static files
app.use(express.static("public"));


// listen for requests
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
    );
