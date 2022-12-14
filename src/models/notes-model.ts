import mongoose, {Schema} from "mongoose";
import {v4 as uuid} from "uuid";

type noteType = {
    title: string;
    content: string;
    tags: string;
    date: string;
}

const noteSchema: Schema = new mongoose.Schema({
    title: { type: String, required: true },
    content: {type: String, require: true },
    tags: [{ type: String, required: true }],
    date: { type: String, default: new Date().toISOString() },
});

noteSchema.method('toJSON', function () {
   const {_id, ...object } = this.toObject();
   object.id = _id;
   return object;
});


console.log("inside note-model-2");

export default mongoose.model<noteType>("Note", noteSchema)


