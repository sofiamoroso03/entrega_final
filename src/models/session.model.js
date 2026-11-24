import mongoose from "mongoose";
import { ROUTINE_COLLECTION_NAME } from "./routine.model.js";
import { USER_COLLECTION_NAME } from "./user.model.js";

const sessionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
        },
        durationMinutes: {
            type: Number,
            required: true,
            min: 1,
        },
        distanceKm: {
            type: Number,
            min: 0,
            default: null,
        },
        effort: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
        },
        notes: {
            type: String,
            trim: true,
            default: "",
        },
        routineId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: ROUTINE_COLLECTION_NAME,
            required: true,
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

export const SESSION_COLLECTION_NAME = "Session";
const Session = mongoose.model(SESSION_COLLECTION_NAME, sessionSchema);

export default Session;