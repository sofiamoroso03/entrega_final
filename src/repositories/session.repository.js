import Session from "../models/session.model.js";

const ROUTINE_POPULATE_FIELDS = "name category intensity targetDuration description";

class SessionRepository {
    async create(session_data) {
        const created = await Session.create(session_data);
        return await created.populate("routineId", ROUTINE_POPULATE_FIELDS);
    }

    async getAllByUser(userId, routineId = null) {
        const filter = { userId };
        if (routineId) {
            filter.routineId = routineId;
        }

        return await Session.find(filter)
            .populate("routineId", ROUTINE_POPULATE_FIELDS)
            .sort({ date: -1, createdAt: -1 });
    }

    async getByIdAndUser(sessionId, userId) {
        return await Session.findOne({ _id: sessionId, userId }).populate(
            "routineId",
            ROUTINE_POPULATE_FIELDS
        );
    }

    async updateByIdAndUser(sessionId, userId, update_data) {
        return await Session.findOneAndUpdate(
            { _id: sessionId, userId },
            update_data,
            { new: true, runValidators: true }
        ).populate("routineId", ROUTINE_POPULATE_FIELDS);
    }

    async deleteByIdAndUser(sessionId, userId) {
        return await Session.findOneAndDelete({ _id: sessionId, userId });
    }

    async countByRoutineAndUser(routineId, userId) {
        return await Session.countDocuments({ routineId, userId });
    }
}

const session_repository = new SessionRepository();
export default session_repository;