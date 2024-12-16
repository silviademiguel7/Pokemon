export interface ServerError<D = any> {
	config: {
		method: string;
		url: string;
	};
	data: D;
	headers: { [key: string]: string };
	status: number;
	statusText: string;
}

export const isServerError = (error: any): error is ServerError => {
	return error.config !== undefined && error.status !== undefined;
};
