const express = require('express');
const fs = require('fs')
const app = express();
const Data = require('./MOCK_DATA.json');
const port = 8000;




// MIDDLWARE
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
    // console.log("Hello From Middleware");

    fs.appendFile("./log.txt", `/n${Date.now()}: ${req.method}: ${req.ip} `, (err, data) => {
        next()
    });

})

app.use((req, res, next) => {
    // console.log("Hello From Middleware 2");

    return res.end("End")
})


// ROUTING

// app.get("/users", (req, res) => {
//     return res.send(`<ul>
//         ${
//             Data.map((name) => `<li>${name.first_name}</li>`).join("")
//         }
//         </ul>`)
// })


app.get("/api/users", (req, res) => {
    return res.json(Data)
})

// DYNAMIC ROUTE

app.get("/api/user/:id", (req, res) => {
    const id = req.params.id;

    const user = Data.find((userid) => userid == id);
    return res.send({userdetail: user});

})



// POST REQUEST

app.post("/api/users", (req, res) => {
    const body = req.body;
    console.log("Body", body);

    Data.push({...body, id: Data.length + 1});

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(Data), (err) => {
        return res.send({status: "Pending"})
    })

})


// DELETE USER
app.delete("/api/user/delete/:id", (req, res) => {
    const userid = req.params.id;

    const userindex = Data.findIndex((user) => user.id == userid);
    console.log("userindex", userindex);

    if(userindex !== -1){
        Data.splice(userindex, 1)
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(Data, null, 2), (err) => {
            if(err){
                res.status(500).send({ status: "Error", message: "Failed to delete user" });
            }

            return res.send({ status: "Success", message: "User deleted successfully" });
        })
    }else{
        return res.status(404).send({ status: "Error", message: "User not found" });
    }
})


// UPDATE USER
app.patch("/api/user/update/:id", (req, res) => {
    const userid = req.params.id;
    const body = req.body;
    const userindex = Data.findIndex((user) => user.id == userid);

    if(userid !== -1){

        Data[userindex] = {...Data[userindex], ...body};

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(Data, null, 2), (err) => {
            if(err){
                return res.status(500).send({ status: "Error", message: "Failed to update user" });
            }
            return res.send({ status: "Success", message: "User updated successfully" });
        })
    }else{
        return res.status(404).send({ status: "Error", message: "User not found" });
    }

})


app.listen(port, () => console.log("Server Created"));