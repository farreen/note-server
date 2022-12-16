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

const updateNotes = (req: Request, res: Response) => {
    const {id, title, content} = req.body;
    console.log("inside update", req.body);
    NoteModel.findByIdAndUpdate(id, {title, content})
    .then(() => res.status(200).send("updated succesfully"))
    .catch((err) => console.log("err", err));
}

const deleteNotes = (req: Request, res: Response) => {
    let id: string = req.params.id;
    console.log("inside delete", req.params.id)
    NoteModel.findByIdAndDelete(id)
    .then(() => res.status(200).send("deleted succesfully"))
    .catch((err) => res.send(err))
}

export default {createNotes, readNotes, updateNotes, deleteNotes}

