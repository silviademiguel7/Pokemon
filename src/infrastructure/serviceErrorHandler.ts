import { ServerError } from "../domain/models/ServerError";
import { ServerErrorType } from "../domain/models/ServerErrorType";

export const serviceErrorHandler = (
	error: ServerError,
	callback: () => void
) => {
	const serverErrorType = getTypeOfServerErrror(error);

	switch (serverErrorType) {
		case "NotFound":
			throw new Error("Not found");
		case "NotaAuthorized":
			throw new Error("Not authorized");
		case "InMaintenance":
			throw new Error("In maintenance");
		case "RequestError":
			callback();
			break;
	}
};

const getTypeOfServerErrror = (error: ServerError): ServerErrorType => {
	if (error.status === 404) {
		return "NotFound";
	}
	if (error.status === 401) {
		return "NotaAuthorized";
	}
	if (error.status === 501) {
		return "InMaintenance";
	}
	return "RequestError";
};
