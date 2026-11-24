import Routine from "../models/routine.model.js";

class RoutineRepository {
    async create(routine_data) {
        return await Routine.create(routine_data);
    }

    async getAllByUser(userId) {
        return await Routine.find({ userId }).sort({ createdAt: -1 });
    }

    async getByIdAndUser(routineId, userId) {
        return await Routine.findOne({ _id: routineId, userId });
    }

    async updateByIdAndUser(routineId, userId, update_data) {
        return await Routine.findOneAndUpdate(
            { _id: routineId, userId },
            update_data,
            { new: true, runValidators: true }
        );
    }

    async deleteByIdAndUser(routineId, userId) {
        return await Routine.findOneAndDelete({ _id: routineId, userId });
    }
}

const routine_repository = new RoutineRepository();
export default routine_repository;