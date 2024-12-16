import { ServerError } from "../domain/models/ServerError";

export function buildServerError(error: any): ServerError {
	const serverError = {
		config: {
			method: error.config.method,
			url: error.config.url,
		},
		headers: {
			...error.config.headers,
		},
		data: error.response.data,
		status: error.response.status,
		statusText: error.message,
	};

	return serverError;
}
