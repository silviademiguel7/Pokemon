export class ServiceError<ErrorType> extends Error {
	public type: ErrorType;
	public message: string;

	constructor({
		message,
		errorType,
	}: {
		message: string;
		errorType: ErrorType;
	}) {
		super();

		this.type = errorType;
		this.message = message;
	}
}

export function isServiceError<ErrorType>(
	error: any
): error is ServiceError<ErrorType> {
	return error instanceof ServiceError;
}
