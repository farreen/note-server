"use strict";

import express, { Request, Response } from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";

import connectDB from "./src/config/config"
import notesRouter from "./src/routes/notes-route"

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());


app.use("/api", notesRouter)
console.log("inside index")

app.listen(20959, () => {
    connectDB();
    console.log('Server running');
});
