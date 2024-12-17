import { apiClient, axiosInstance } from "../apliClient";

jest.mock("../buildServerError");

describe("apiClient", () => {
	it("should return data of axios get method", async () => {
		// Arrange
		jest.spyOn(axiosInstance, "get").mockResolvedValue({ data: "data" });

		// Act
		const response = await apiClient.get("url");

		// Assert
		expect(axiosInstance.get).toHaveBeenCalledWith("url");
		expect(response).toEqual({ data: "data" });
	});
});
