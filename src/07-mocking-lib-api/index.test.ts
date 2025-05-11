import axios from "axios";
import { throttledGetDataFromApi } from "./index";

jest.mock("axios");

describe("throttledGetDataFromApi", () => {
  const endPoint = "/todos/1";
  const mockData = { id: 1, title: "Test Todo" };

  beforeAll(() => jest.useFakeTimers());
  beforeEach(() => jest.runOnlyPendingTimers());
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.useRealTimers());

  test("should create instance with provided base url", async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: {} }),
    };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    await throttledGetDataFromApi("/posts/1");

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: "https://jsonplaceholder.typicode.com",
    });
  });

  test("should perform request to correct provided url", async () => {
    const mockResponse = { data: mockData };
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue(mockResponse),
    };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    await throttledGetDataFromApi(endPoint);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(endPoint);
  });

  test("should return response data", async () => {
    const mockResponse = { data: mockData };
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue(mockResponse),
    };

    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    const result = await throttledGetDataFromApi(endPoint);

    expect(result).toEqual(mockData);
  });
});
