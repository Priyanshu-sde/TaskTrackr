import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: String,
    done: Boolean,
    userId: mongoose.Schema.Types.ObjectId,
  });

  export default mongoose.model('Todo',todoSchema);