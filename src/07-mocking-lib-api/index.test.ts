// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn), // Mock throttle to directly call the function
}));

const PATH = '/test';
const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockAxiosInstance = { get: jest.fn().mockResolvedValue({ data: 'fakeData' }) };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    await throttledGetDataFromApi(PATH);

    expect(axios.create).toHaveBeenCalledWith({ baseURL: BASE_URL });
    expect(mockAxiosInstance.get).toHaveBeenCalledWith(PATH);
  });

  test('should perform request to correct provided url', async () => {
    const mockAxiosInstance = { get: jest.fn().mockResolvedValue({ data: 'fakeData' }) };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    await throttledGetDataFromApi('/users/1');
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/users/1');

    await throttledGetDataFromApi('/users/2');
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/users/2');
  });

  test('should return response data', async () => {
    const mockResponseData1 = { data: 'fakeData' };
    const mockAxiosInstance = { get: jest.fn().mockResolvedValue({ data: mockResponseData1 }) };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    const result = await throttledGetDataFromApi('/users');
    expect(result).toEqual(mockResponseData1);
  });
});
