import axios from "axios";
import { buildServerError } from "./buildServerError";

const config = {
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
};
const axiosInstance = axios.create(config);
axiosInstance.interceptors.response.use(undefined, (error) => {
	const serverError = buildServerError(error);
	return Promise.reject(serverError);
});

export const apiClient = {
	get: async <T>(url: string) => {
		const response = await axiosInstance.get<T>(url);
		return response;
	},
};
