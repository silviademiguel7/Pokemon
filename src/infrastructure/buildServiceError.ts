import { ServiceError } from "../domain/models/ServiceError";

export const buildServiceError = <T extends string>({
	type,
	message,
}: {
	type: T;
	message: string;
}): ServiceError<T> => {
	return new ServiceError({
		errorType: type,
		message,
	});
};
