import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createSessionSchema = z.object({
    title: z
        .string()
        .trim()
        .min(2, "El título debe tener al menos 2 caracteres")
        .max(100, "El título no puede superar los 100 caracteres"),
    date: z
        .string({ required_error: "La fecha es requerida" })
        .refine((val) => !Number.isNaN(Date.parse(val)), "La fecha no tiene un formato válido")
        .transform((val) => new Date(val)),
    durationMinutes: z.preprocess(
        (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
        z
            .number({ required_error: "La duración en minutos es requerida" })
            .int("La duración debe ser un número entero")
            .min(1, "La duración debe ser de al menos 1 minuto")
    ),
    distanceKm: z.preprocess(
        (val) => {
            if (val === undefined) return undefined;
            if (val === "" || val === null) return null;
            return Number(val);
        },
        z
            .number()
            .min(0, "La distancia no puede ser negativa")
            .nullable()
            .optional()
    ),
    effort: z.preprocess(
        (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
        z
            .number({ required_error: "El esfuerzo percibido es requerido" })
            .int("El esfuerzo debe ser un número entero")
            .min(1, "El esfuerzo mínimo es 1")
            .max(10, "El esfuerzo máximo es 10")
    ),
    notes: z
        .string()
        .trim()
        .max(1000, "Las notas no pueden superar los 1000 caracteres")
        .optional(),
    routineId: z
        .string({ required_error: "La rutina asociada es requerida" })
        .regex(objectIdRegex, "El ID de rutina no tiene un formato válido"),
});

export const updateSessionSchema = createSessionSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    { message: "Debés enviar al menos un campo para actualizar" }
);