import auth_service from "../services/auth.service.js";

export async function register(request, response) {
    await auth_service.register(request.body);

    return response.status(201).json({
        ok: true,
        status: 201,
        message: "Usuario registrado exitosamente. Revisá tu correo para verificar la cuenta.",
    });
}

export async function login(request, response) {
    const data = await auth_service.login(request.body);

    return response.status(200).json({
        ok: true,
        status: 200,
        message: "Inicio de sesión exitoso",
        data,
    });
}

export async function verifyEmail(request, response) {
    const { verify_email_token } = request.params;
    await auth_service.verifyEmail(verify_email_token);

    return response.status(200).json({
        ok: true,
        status: 200,
        message: "Usuario verificado exitosamente",
    });
}