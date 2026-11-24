import routine_service from "../services/routine.service.js";

export async function getAllRoutines(request, response) {
    const routines = await routine_service.getAll(request.user.id);

    return response.status(200).json({
        ok: true,
        status: 200,
        message: "Rutinas obtenidas exitosamente",
        data: { routines },
    });
}

export async function getRoutineById(request, response) {
    const routine = await routine_service.getById(request.params.id, request.user.id);

    return response.status(200).json({
        ok: true,
        status: 200,
        message: "Rutina obtenida exitosamente",
        data: { routine },
    });
}

export async function createRoutine(request, response) {
    const routine = await routine_service.create(request.user.id, request.body);

    return response.status(201).json({
        ok: true,
        status: 201,
        message: "Rutina creada exitosamente",
        data: { routine },
    });
}

export async function updateRoutine(request, response) {
    const routine = await routine_service.update(
        request.params.id,
        request.user.id,
        request.body
    );

    return response.status(200).json({
        ok: true,
        status: 200,
        message: "Rutina actualizada exitosamente",
        data: { routine },
    });
}

export async function deleteRoutine(request, response) {
    await routine_service.delete(request.params.id, request.user.id);

    return response.status(200).json({
        ok: true,
        status: 200,
        message: "Rutina eliminada exitosamente",
    });
}