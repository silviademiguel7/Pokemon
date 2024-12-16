import { isServerError } from "./domain/models/ServerError";
import { serviceErrorHandler } from "./infrastructure/serviceErrorHandler";

export const errorEventsInterceptor = (callback: () => void) => {
	window.onerror = function (message, source, lineno, colno, error) {
		console.log("onerror", message, source, lineno, colno, error);
		if (isServerError(error)) {
			serviceErrorHandler(error, callback);
		}
	};

	window.addEventListener("unhandledrejection", function (event) {
		console.log("unhandledrejection", event);
		if (isServerError(event.reason)) {
			serviceErrorHandler(event.reason, callback);
		}
	});
};
