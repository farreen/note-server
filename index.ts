"use strict";

import express, { Request, Response } from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import {v4 as uuid} from "uuid";

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());

type Note = {
    id: string;
    title: string;
    content: string;
};

app.post("/api/notes", (req: Request, res: Response) => {
    console.log(req.body);
    const title = req.body.title;
    const content = req.body.content;
    if(title.length <= 4 && content.length <= 4) {
        res.status(400);
        res.send("title and content should have atleast five character");
    }else{
        var note = {
           id: uuid(),
           title: req.body.title,
           content: req.body.content
        };
        console.log(note);
        fs.readFile('notes.json', 'utf8', (err: any, data: string) => {
            if(err) return res.send(err);
            var notes = [];
            if(data.length !== 0){
                notes = JSON.parse(data);
            }
            notes.push(note);
            var fileContent = JSON.stringify(notes, null, 4);
            fs.writeFile('notes.json', fileContent, (err: any) => {
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
    }
});

app.get("/api/notes", (_req: Request, res: Response) => {
    fs.readFile('notes.json', 'utf8', (err: any, data: string) => {
        if(err) {
            res.status(500);
            res.send("cannot list the items");
        }else{
            res.send(data);
        }
    })
});

app.put('/api/notes', (req, res) => {
    const {id, title, content} = req.body;
    fs.readFile('notes.json', 'utf8', (err: any, data: string) => {
        if(err) return res.send(err);
        var notes = JSON.parse(data);
        console.log("file content", notes);
        for(const obj of notes) {
            console.log('object', obj);
            if(obj.id === id) {
                console.log('inside if block');
                obj.title = title;
                obj.content = content;    
                var newContent = JSON.stringify(notes, null, 4);
                fs.writeFile('notes.json', newContent, (err: any) => {
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

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('notes.json', 'utf8', (err: any, data: string) => {
        if(err) return res.send(err);
        var notes:Note[] = JSON.parse(data);
        const id: string = req.params.id
        console.log("id", id);
        let content = notes.filter((note) => note.id !== id )
        let newContent = JSON.stringify(content, null, 4);
        console.log("newContent", newContent);
        fs.writeFile("notes.json", newContent, (err: any) => {
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
