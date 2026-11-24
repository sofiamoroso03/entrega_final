import jwt from "jsonwebtoken";
import ENVIRONMENT from "../config/environment.config.js";
import mailer_transporter from "../config/mailer.config.js";
import user_repository from "../repositories/user.repository.js";
import { compareHash, generateHash } from "../utils/bcrypt.util.js";
import ServerError from "../utils/error.util.js";

class AuthService {
    async register({ username, email, password }) {
        const user_already_exist = await user_repository.getByEmail(email);
        if (user_already_exist) {
            throw new ServerError("El email ya está registrado", 409);
        }

        const password_hash = await generateHash(password);
        await user_repository.create(username, email, password_hash);

        const verify_email_token = jwt.sign(
            { email },
            ENVIRONMENT.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        await mailer_transporter.sendMail({
            to: email,
            from: ENVIRONMENT.GMAIL_USER,
            subject: "Verificá tu cuenta - Workout Tracker",
            html: `
                <body>
                    <h1>Bienvenido a Workout Tracker</h1>
                    <p>Necesitamos verificar tu correo electrónico para activar tu cuenta.</p>
                    <a href="${ENVIRONMENT.URL_BACKEND}/api/auth/verify-email/${verify_email_token}">
                        Click aquí para verificar tu cuenta
                    </a>
                </body>
            `,
        });
    }

    async login({ email, password }) {
        const user = await user_repository.getByEmail(email);
        if (!user) {
            throw new ServerError("Email o contraseña inválidos", 401);
        }

        if (!user.activo) {
            throw new ServerError("Tu cuenta se encuentra desactivada", 403);
        }

        const isPasswordValid = await compareHash(password, user.password);
        if (!isPasswordValid) {
            throw new ServerError("Email o contraseña inválidos", 401);
        }

        if (!user.email_verificado) {
            throw new ServerError("Debés verificar tu email antes de iniciar sesión", 403);
        }

        const auth_token = jwt.sign(
            {
                id: user._id,
                name: user.nombre,
                email: user.email,
            },
            ENVIRONMENT.JWT_SECRET_KEY,
            {
                expiresIn: "24h",
            }
        );

        return {
            auth_token,
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
            },
        };
    }

    async verifyEmail(verify_email_token) {
        let payload;
        try {
            payload = jwt.verify(verify_email_token, ENVIRONMENT.JWT_SECRET_KEY);
        } catch {
            throw new ServerError("El token de verificación es inválido o expiró", 400);
        }

        const user_found = await user_repository.getByEmail(payload.email);
        if (!user_found) {
            throw new ServerError("Usuario no encontrado", 404);
        }

        if (!user_found.activo) {
            throw new ServerError("El usuario está desactivado de la plataforma", 403);
        }

        if (user_found.email_verificado) {
            throw new ServerError("Tu cuenta ya estaba verificada", 400);
        }

        await user_repository.updateById(user_found._id, {
            email_verificado: true,
        });
    }
}

const auth_service = new AuthService();
export default auth_service;