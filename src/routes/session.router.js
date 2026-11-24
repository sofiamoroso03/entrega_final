import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import {
    createSessionSchema,
    updateSessionSchema,
} from "../validators/session.validator.js";
import {
    createSession,
    deleteSession,
    getAllSessions,
    getSessionById,
    updateSession,
} from "../controllers/session.controller.js";

const session_router = express.Router();

session_router.use(authMiddleware);

session_router.get("/", getAllSessions);
session_router.get("/:id", getSessionById);
session_router.post("/", validateBody(createSessionSchema), createSession);
session_router.put("/:id", validateBody(updateSessionSchema), updateSession);
session_router.delete("/:id", deleteSession);

export default session_router;