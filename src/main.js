import connectMongoDB from "./config/mongo.config.js";
import express from "express";
import cors from "cors";
import ENVIRONMENT from "./config/environment.config.js";
import errorHandlerMiddleware from "./middlewares/error.middleware.js";
import auth_router from "./routes/auth.router.js";
import user_router from "./routes/user.router.js";
import routine_router from "./routes/routine.router.js";
import session_router from "./routes/session.router.js";

connectMongoDB();

const PORT = ENVIRONMENT.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (request, response) => {
    return response.status(200).json({
        ok: true,
        message: "Workout Tracker API funcionando",
    });
});

app.use("/api/auth", auth_router);
app.use("/api/users", user_router);
app.use("/api/sessions", session_router);


app.use((request, response) => {
    return response.status(404).json({
        ok: false,
        status: 404,
        message: "Ruta no encontrada",
    });
});

app.use(errorHandlerMiddleware);

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`El servidor se está escuchando correctamente en http://localhost:${PORT}`);
    });
}

export default app;

