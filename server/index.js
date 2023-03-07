const express = require("express")
const mysql = require("mysql")
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "sqlpass",
    database: "loginsystem",
})

app.post('/register', (req,res) => {

    const username = req.body.username 
    const password = req.body.password 
    const email = req.body.email
    
    // ^ it gets values that are send from front end to backend

    db.query("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [username, password,email], (err, result) => {
        if (err){
            console.log(err);
        } else {
            console.log('succes');
        }
    })
})

app.post('/login', (req,res) => {

    const username = req.body.username 
    const password = req.body.password 
    
    
    // ^ it gets values that are send from front end to backend

    db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, result) => {
        if (err){
            res.send({err: err});
        }

        if (result.length > 0) {
            res.send(result)
        } else {
            res.send({message: "Wrong username and password combinatioon"})
        }

    })

})


app.listen(3001, () => {
    console.log('Server running on port 3001');
})