import mongoose from "mongoose"
import { required } from "zod/v4-mini"


const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    status: {type: String, required: false},
    trigger: {type: String, required: false },

}, {timestamps: true});

export const Project = mongoose.model("Project", projectSchema)