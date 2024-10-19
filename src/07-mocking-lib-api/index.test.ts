import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const mockResponseData = { id: 1, title: 'Test Data' };
  const relativePath = '/posts/1';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
      defaults: {},
      interceptors: { request: {}, response: {} },
    } as unknown as AxiosInstance;

    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: mockResponseData });
    const mockAxiosInstance = {
      get: mockGet,
      defaults: {},
      interceptors: { request: {}, response: {} },
    } as unknown as AxiosInstance;

    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    await throttledGetDataFromApi(relativePath);

    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
      defaults: {},
      interceptors: { request: {}, response: {} },
    } as unknown as AxiosInstance;

    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(mockResponseData);
  });
});
