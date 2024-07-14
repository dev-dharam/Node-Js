const express = require('express');
const mongoose = require('mongoose')
const port = 8000;

const app = express();

// MIDDLEWARE
app.use(express.urlencoded({extends: true}));


// Schema

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    }
}, {timestamps: true});


const usermodel = mongoose.model("users", UserSchema);


// MONGODB CONNECT
mongoose.connect("mongodb://127.0.0.1:27017/newpro").then(() => console.log("Database connected")).catch(() => console.log("Error in mongodb"));


// ROUTES

app.get("/api/users", async (req, res) => {
    const users = await usermodel.find();

    return res.status(200).json({success: true, message: "All users", allusers: users});

})


app.post("/api/user/add", async (req, res) => {
    const body = req.body;

    if(!body || !body.name || !body.email || !body.password){
        return res.send("Please Fill the fields!");
    }

    await usermodel.create({
        name: body.name,
        email: body.email,
        password: body.password
    });

    return res.status(200).json({success: true, message: "User created"});

})

app.patch("/api/user/update/:id", async(req, res) => {
    const id = req.params.id;

    // const user = usermodel.findById(id);
    
   await usermodel.findByIdAndUpdate(id, {password: "1234567"})

    return res.status(200).json({success: true, message: "User updated"});

})

app.delete("/api/user/delete/:id", async (req, res) => {
    const id = req.params.id;

    // const user = usermodel.findById(id);
    
    await usermodel.findByIdAndDelete(id)

    return res.status(200).json({success: true, message: "User deleted"});

})


app.listen(port, () => {console.log("Server is created!")});