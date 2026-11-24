import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import {
    createRoutineSchema,
    updateRoutineSchema,
} from "../validators/routine.validator.js";
import {
    createRoutine,
    deleteRoutine,
    getAllRoutines,
    getRoutineById,
    updateRoutine,
} from "../controllers/routine.controller.js";

const routine_router = express.Router();

routine_router.use(authMiddleware);

routine_router.get("/", getAllRoutines);
routine_router.get("/:id", getRoutineById);
routine_router.post("/", validateBody(createRoutineSchema), createRoutine);
routine_router.put("/:id", validateBody(updateRoutineSchema), updateRoutine);
routine_router.delete("/:id", deleteRoutine);

export default routine_router;