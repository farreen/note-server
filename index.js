"use strict";

const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const {v4: uuid} = require('uuid');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());

app.post("/api/insert", (req, res) => {
    console.log(req.body);
    var note = {
        id: uuid(),
        title: req.body.title,
        content: req.body.content
    };
    console.log(note);
    fs.readFile('file.txt', 'utf8', (err, data) => {
        var notes = [];
        if(data.length !== 0){
            notes = JSON.parse(data);
        }
        notes.push(note);
        var fileContent = JSON.stringify(notes);
        fs.writeFile('file.txt', fileContent, (err) => {
            if(err){
                res.status(500);  
                res.send();    
            }else{
                res.status(200);
                res.send();  
                console.log('file saved');
            }
        })
    })
});

app.get("/api/list", (req, res) => {
    fs.readFile('file.txt', 'utf8', (err, data) => {
        if(err) {
            res.status(500);
            res.send();
        }else{
            res.send(data);
        }
    })
});

//app.get("/api/get",(req, res) => {
//    fs.readFile('file.txt', 'utf8', (err, data) => {
//        res.send(data)
//        console.log('file read', data)
//    })
//});

app.put('/api/update', (req, res) => {
    const {id, title, content} = req.body;
    fs.readFile('file.txt', 'utf8', (err, data) => {
        var notes = JSON.parse(data);
        console.log("file content", notes);
        for(const obj of notes) {
            console.log('object', obj);
            if(obj.id === id) {
                console.log('inside if block');
                obj.title = title;
                obj.content = content;    
                var newContent = JSON.stringify(notes);
                fs.writeFile('file.txt', newContent, (err) => {
                    if(err) {
                        res.status(500);
                        res.send();
                    }else{
                        console.log('file updated');
                        res.status(200);
                        res.send();
                    }
                })
                return;  
            }
        }
        res.status(404);
        res.send();
        console.log('id not found');
    })
});

app.listen(20959, () => {
    console.log('Server running');
});
