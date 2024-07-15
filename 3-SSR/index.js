const express = require('express');
const path = require('path');

const app = express();
const PORT = 8000;

// MIDDLEWARE


// TEMPLATE ENGINE SET
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// ROUTES
app.get("/", (req, res) => {
    res.render('home')
})

app.listen(PORT, () => console.log(`Server is Running at ${PORT}`));