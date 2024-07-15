const express = require('express');
const path = require('path');
const urlrouter = require('./routes/url');
const staticRouter = require('./routes/staticRoute');
const { ConnectDB } = require('./db/connectDB');
const { handleRedirectUrl } = require('./controllers/urlControler');

const app = express();
const PORT = 8000;

// DB
ConnectDB("mongodb://127.0.0.1:27017/shortURL").then(() => console.log("Database Connected"));

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ROUTES
app.use("/url", urlrouter);
app.use("/", staticRouter);

app.get("/:shortId", handleRedirectUrl);


// TEMPLATED ENGINE SETUP
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));




app.listen(PORT, () => console.log(`Server in Running at ${PORT}`));