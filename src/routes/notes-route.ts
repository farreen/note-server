import express  from "express";
import controller from "../controllers/notes-controller"
const router  = express.Router();

router.post("/notes", controller.createNotes);
router.get("/notes", controller.readNotes);
router.put("/notes", controller.updateNotes);
router.delete("/notes/:id", controller.deleteNotes);

console.log("notesRouter");

export default router;
