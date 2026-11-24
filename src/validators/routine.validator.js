import { z } from "zod";

const CATEGORIES = ["running", "fuerza", "cardio", "movilidad", "otro"];
const INTENSITIES = ["baja", "media", "alta"];

export const createRoutineSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(80, "El nombre no puede superar los 80 caracteres"),
    category: z.enum(CATEGORIES, {
        message: "La categoría debe ser: running, fuerza, cardio, movilidad u otro",
    }),
    intensity: z.enum(INTENSITIES, {
        message: "La intensidad debe ser: baja, media o alta",
    }),
    targetDuration: z.preprocess(
        (val) => {
            if (val === undefined) return undefined;
            if (val === "" || val === null) return null;
            return Number(val);
        },
        z
            .number()
            .int("La duración objetivo debe ser un número entero")
            .min(1, "La duración objetivo debe ser al menos 1 minuto")
            .nullable()
            .optional()
    ),
    description: z
        .string()
        .trim()
        .max(500, "La descripción no puede superar los 500 caracteres")
        .optional(),
});

export const updateRoutineSchema = createRoutineSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    { message: "Debés enviar al menos un campo para actualizar" }
);