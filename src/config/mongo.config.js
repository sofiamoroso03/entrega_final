import mongoose from "mongoose";
import ENVIRONMENT from "./environment.config.js";

async function connectMongoDB() {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    try {
        await mongoose.connect(ENVIRONMENT.MONGO_DB_URI, {
            dbName: ENVIRONMENT.MONGO_DB_NAME,
        });
        console.log("Conexion a MongoDB exitosa!");
    } catch (error) {
        console.error("Error critico al conectar al MongoDB", error.message);

        if (!process.env.VERCEL) {
            process.exit(1);
        }
    }
}

export default connectMongoDB;



