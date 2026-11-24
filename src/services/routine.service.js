import mongoose from "mongoose";
import routine_repository from "../repositories/routine.repository.js";
import ServerError from "../utils/error.util.js";
import session_repository from "../repositories/session.repository.js";

class RoutineService {
    #validateObjectId(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ServerError("El ID de rutina no tiene un formato válido", 400);
        }
    }

    async create(userId, routine_data) {
        return await routine_repository.create({
            ...routine_data,
            userId,
        });
    }

    async getAll(userId) {
        return await routine_repository.getAllByUser(userId);
    }

    async getById(routineId, userId) {
        this.#validateObjectId(routineId);

        const routine = await routine_repository.getByIdAndUser(routineId, userId);
        if (!routine) {
            throw new ServerError("Rutina no encontrada", 404);
        }

        return routine;
    }

    async update(routineId, userId, update_data) {
        this.#validateObjectId(routineId);

        const updated = await routine_repository.updateByIdAndUser(
            routineId,
            userId,
            update_data
        );

        if (!updated) {
            throw new ServerError("Rutina no encontrada", 404);
        }

        return updated;
    }

    async delete(routineId, userId) {
        this.#validateObjectId(routineId);

        const sessionsCount = await session_repository.countByRoutineAndUser(
            routineId,
            userId
        );
        if (sessionsCount > 0) {
            throw new ServerError(
                "No podés eliminar esta rutina porque tiene entrenamientos asociados. Eliminá o reasigná esas sesiones primero.",
                409
            );
        }

        const deleted = await routine_repository.deleteByIdAndUser(routineId, userId);
        if (!deleted) {
            throw new ServerError("Rutina no encontrada", 404);
        }

        return deleted;
    }
}

const routine_service = new RoutineService();
export default routine_service;