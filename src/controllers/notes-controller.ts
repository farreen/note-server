import express, {Request, Response} from "express";

import NoteModel from "../models/notes-model";

const readNotes = (_: Request, res: Response) => {
    console.log("inside readNotes")
    NoteModel.find()
    .then((note) => res.json(note))
    .catch((err) => res.status(400).send(err))
}


export default {readNotes}

