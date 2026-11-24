import ServerError from "../utils/error.util.js";

export function validateBody(schema) {
    return (request, response, next) => {
        const result = schema.safeParse(request.body);

        if (!result.success) {
            const messages = result.error.issues
                .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
                .join(" | ");

            return next(new ServerError(messages, 400));
        }

        request.body = result.data;
        next();
    };
}