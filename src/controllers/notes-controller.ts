import express, {Request, Response} from "express";

import NoteModel from "../models/notes-model";

const createNotes = (req: Request, res: Response) => {
    const {title, content, tags} = req.body;
    console.log("req Body..", req.body);

    if(title.length === 0 || content.length === 0 || title.length <= 4 || content.length <= 4 || tags.length == 0) {
        res.status(400);
        res.send("title and content should have atleast five character");
    }else{
        const newNote = new NoteModel({title, content, tags})
        console.log("inside create", newNote);
        newNote.save()
        .then(() => res.status(200).send(newNote.id))
        .catch((err: Error) => res.status(400).send(`Error: ${err}`))
    }
}

const readNotes = (_: Request, res: Response) => {
    console.log("inside readNotes")
    NoteModel.find()
    .then((note) => res.json(note))
    .catch((err) => res.status(400).send(err))
}


export default {readNotes, createNotes}

