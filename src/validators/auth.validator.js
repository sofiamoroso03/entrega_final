import { z } from "zod";

export const registerSchema = z.object({
    username: z
        .string({ required_error: "El nombre de usuario es requerido" })
        .trim()
        .min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z
        .string({ required_error: "El email es requerido" })
        .trim()
        .email("El formato del email es incorrecto")
        .toLowerCase(),
    password: z
        .string({ required_error: "La contraseña es requerida" })
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const loginSchema = z.object({
    email: z
        .string({ required_error: "El email es requerido" })
        .trim()
        .email("El formato del email es incorrecto")
        .toLowerCase(),
    password: z
        .string({ required_error: "La contraseña es requerida" })
        .min(1, "La contraseña es requerida"),
});