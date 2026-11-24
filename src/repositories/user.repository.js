import User from "../models/user.model.js";

class UserRepository {
    async create(nombre, email, password) {
        return await User.create({
            nombre,
            email,
            password,
        });
    }

    async getAll() {
        return await User.find({ activo: true });
    }

    async getById(user_id) {
        return await User.findById(user_id);
    }

    async getByEmail(email) {
        return await User.findOne({ email });
    }

    async updateById(user_id, update_data) {
        return await User.findByIdAndUpdate(user_id, update_data, {
            new: true,
        });
    }

    async deleteById(user_id) {
        return await User.findByIdAndDelete(user_id);
    }
}

const user_repository = new UserRepository();
export default user_repository;