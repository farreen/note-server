import express  from "express";
import controller from "../controllers/notes-controller"
const router  = express.Router();

router.post("/notes", controller.createNotes);
router.get("/notes", controller.readNotes);
console.log("notesRouter")
//router.get("/get", controller.readNotes);
//router.put("/update", controller.updateNotes);
//router.delete("/delete", controller.deleteNotes);

export default router;
