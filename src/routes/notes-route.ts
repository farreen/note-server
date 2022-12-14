import express  from "express";
import controller from "../controllers/notes-controller"
const router  = express.Router();

router.get("/notes", controller.readNotes);

console.log("notesRouter");

export default router;
