import mongoose from "mongoose";
import { USER_COLLECTION_NAME } from "./user.model.js";

const routineSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            enum: ["running", "fuerza", "cardio", "movilidad", "otro"],
            default: "otro",
            required: true,
        },
        intensity: {
            type: String,
            enum: ["baja", "media", "alta"],
            default: "media",
            required: true,
        },
        targetDuration: {
            type: Number,
            min: 1,
            default: null,
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: USER_COLLECTION_NAME,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const ROUTINE_COLLECTION_NAME = "Routine";
const Routine = mongoose.model(ROUTINE_COLLECTION_NAME, routineSchema);

export default Routine;