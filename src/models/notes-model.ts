import mongoose, {Schema} from "mongoose";
import {v4 as uuid} from "uuid";

type noteType = {
    title: string;
    content: string;
    tags: string;
}
const noteSchema: Schema = new mongoose.Schema({
    title: { type: String, required: true },
    content: {type: String, require: true},
    tags: [{type: String, required: true}],

});
console.log("inside note-model-2");

export default mongoose.model<noteType>("Note", noteSchema)


