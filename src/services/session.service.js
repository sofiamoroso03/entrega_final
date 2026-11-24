import mongoose from "mongoose";
import routine_repository from "../repositories/routine.repository.js";
import session_repository from "../repositories/session.repository.js";
import ServerError from "../utils/error.util.js";

class SessionService {
    #validateObjectId(id, label = "ID") {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ServerError(`El ${label} no tiene un formato válido`, 400);
        }
    }

    async #ensureRoutineBelongsToUser(routineId, userId) {
        this.#validateObjectId(routineId, "ID de rutina");
        const routine = await routine_repository.getByIdAndUser(routineId, userId);
        if (!routine) {
            throw new ServerError("La rutina seleccionada no existe o no te pertenece", 404);
        }
    }

    async create(userId, session_data) {
        await this.#ensureRoutineBelongsToUser(session_data.routineId, userId);

        return await session_repository.create({
            ...session_data,
            userId,
        });
    }

    async getAll(userId, routineId = null) {
        if (routineId) {
            this.#validateObjectId(routineId, "ID de rutina");
        }

        return await session_repository.getAllByUser(userId, routineId);
    }

    async getById(sessionId, userId) {
        this.#validateObjectId(sessionId, "ID de sesión");

        const session = await session_repository.getByIdAndUser(sessionId, userId);
        if (!session) {
            throw new ServerError("Sesión de entrenamiento no encontrada", 404);
        }

        return session;
    }

    async update(sessionId, userId, update_data) {
        this.#validateObjectId(sessionId, "ID de sesión");

        if (update_data.routineId) {
            await this.#ensureRoutineBelongsToUser(update_data.routineId, userId);
        }

        const updated = await session_repository.updateByIdAndUser(
            sessionId,
            userId,
            update_data
        );

        if (!updated) {
            throw new ServerError("Sesión de entrenamiento no encontrada", 404);
        }

        return updated;
    }

    async delete(sessionId, userId) {
        this.#validateObjectId(sessionId, "ID de sesión");

        const deleted = await session_repository.deleteByIdAndUser(sessionId, userId);
        if (!deleted) {
            throw new ServerError("Sesión de entrenamiento no encontrada", 404);
        }

        return deleted;
    }
}

const session_service = new SessionService();
export default session_service;