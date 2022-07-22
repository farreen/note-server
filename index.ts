"use strict";

import express, { Request, Response } from "express";
const app = express();
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const {v4: uuid} = require('uuid');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());
type Note = {
    id: string;
    title: string;
    content: string;
};

app.post("/api/insert", (req: Request, res: Response) => {
   console.log(req.body);
   var note = {
       id: uuid(),
       title: req.body.title,
       content: req.body.content
   };
   console.log(note);
    fs.readFile('notes.json', 'utf8', (err: number, data: string) => {
        if(err) return res.send(err);
        var notes = [];
        if(data.length !== 0){
            notes = JSON.parse(data);
        }
        notes.push(note);
        var fileContent = JSON.stringify(notes, null, 4);
        fs.writeFile('notes.json', fileContent, (err: number) => {
            if(err){
                res.status(500);  
                res.send();    
            }else{
                res.status(200);
                res.send(note.id);  
                console.log('file saved');
            }
        })
    })
});

app.get("/api/list", (req: Request, res: Response) => {
    fs.readFile('notes.json', 'utf8', (err: number, data: Note[]) => {
        if(err) {
            res.status(500);
            res.send("cannot list the items");
        }else{
            res.send(data);
            //console.log(data)
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
    fs.readFile('notes.json', 'utf8', (err: number, data: string) => {
        if(err) return res.send(err);
        var notes = JSON.parse(data);
        console.log("file content", notes);
        for(const obj of notes) {
            console.log('object', obj);
            if(obj.id === id) {
                console.log('inside if block');
                obj.title = title;
                obj.content = content;    
                var newContent = JSON.stringify(notes);
                fs.writeFile('notes.json', newContent, (err: number) => {
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

app.delete('/api/deleteNote', (req, res) => {
    fs.readFile('notes.json', 'utf8', (err: number, data: string) => {
        if(err) return res.send(err);
        var notes:Note[] = JSON.parse(data);
        const id: string = req.body.id;
        console.log("id", id);
        let content = notes.filter((note) => note.id !== id )
        let newContent = JSON.stringify(content);
        console.log("newContent", newContent);
        fs.writeFile("notes.json", newContent, (err: number) => {
           if(err){
               res.status(500);
               res.send();
           }else{
               res.status(200);
               res.send();
           }
        });
    });
});

app.listen(20959, () => {
    console.log('Server running');
});
