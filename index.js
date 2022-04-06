"use strict";

const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(bodyParser.json());

app.post("/api/insert", (req, res) => {
    console.log(req.body)
    var obj = req.body;
    var note = obj;
    console.log(note);
   // fs.writeFile('file.txt', note, (err) => {
   //     if(err) throw err;
   //     console.log('file saved');
   // })    
   // fs.appendFile('file.txt',note, (err) => {
   //     if(err){
   //         throw err;
   //     }else{
   //         console.log('done!');
   //     }
   // })

    fs.readFile('file.txt', 'utf8', (err, data) => {
        var notes = [];
        if(data.length !== 0){
            notes = JSON.parse(data);
        }
        notes.push(note);
        var fileContent = JSON.stringify(notes);
        fs.writeFile('file.txt', fileContent, (err) => {
            if(err) throw err;
            console.log('file saved');
        })
    })
})

app.get("/api/list", (req, res) => {
    fs.readFile('file.txt', 'utf8', (err, data) => {
        res.send(data);
        console.log('file read', data)
    })
})

//app.get("/api/get",(req, res) => {
//    fs.readFile('file.txt', 'utf8', (err, data) => {
//        res.send(data)
//        console.log('file read', data)
//    }) 
//})

app.listen(8080, () => {
    console.log('Server running')
})
