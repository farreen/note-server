import express, {Request, Response} from "express";

import NotesModel from "../models/notes-model";

const createNotes = (req: Request, res: Response) => {
    const {title, content, tags} = req.body;
    console.log("bodyDB..", req.body);
    console.log("bodyDBnote..", req.body.title);

    const newNote = new NotesModel({title, content, tags})
    console.log("newNote..", newNote);
    newNote.save()
    .then(() => res.json("note added"))
    .catch((err: Error) => res.status(400).send("Err: "+err))
}

const readNotes = (_: Request, res: Response) => {
    console.log("inside readNotes")
    NotesModel.find()
    .then((note) => res.json(note))
    .catch((err) => res.status(400).send(err))
}

//const updateNotes = (req: Request, res: Response) => {
//    const {id, note} = req.body.data;
//    console.log("body update", req.body.data);
//    NotesModel.findByIdAndUpdate(id, {note})
//    .then(() => res.status(200).send("updated succesfully"))
//    .catch((err) => console.log("err", err));
//}
//
//const deleteNotes = (req: Request, res: Response) => {
//    const {id} = req.body;
//    console.log("ress", req.body)
//    NotesModel.findByIdAndDelete(id)
//    .then(() => res.status(200).send("deleted succesfully"))
//    .catch((err) => res.send(err))
//}

//export default {createNotes, readNotes, updateNotes, deleteNotes}
export default {createNotes, readNotes}

