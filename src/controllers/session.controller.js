import session_service from "../services/session.service.js";

export async function getAllSessions(request, response) {
    const { routineId } = request.query;
    const sessions = await session_service.getAll(request.user.id, routineId);

    return response.status(200).json({
        ok: true,
        status: 200,
        message: "Sesiones obtenidas exitosamente",
        data: { sessions },
    });
}

export async function getSessionById(request, response) {
    const session = await session_service.getById(request.params.id, request.user.id);

    return response.status(200).json({
        ok: true,
        status: 200,
        message: "Sesión obtenida exitosamente",
        data: { session },
    });
}

export async function createSession(request, response) {
    const session = await session_service.create(request.user.id, request.body);

    return response.status(201).json({
        ok: true,
        status: 201,
        message: "Sesión creada exitosamente",
        data: { session },
    });
}

export async function updateSession(request, response) {
    const session = await session_service.update(
        request.params.id,
        request.user.id,
        request.body
    );

    return response.status(200).json({
        ok: true,
        status: 200,
        message: "Sesión actualizada exitosamente",
        data: { session },
    });
}

export async function deleteSession(request, response) {
    await session_service.delete(request.params.id, request.user.id);

    return response.status(200).json({
        ok: true,
        status: 200,
        message: "Sesión eliminada exitosamente",
    });
}