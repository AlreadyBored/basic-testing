// Uncomment the code below and write your tests
 import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index'; 

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValueOnce({ data: {} }),
    } as unknown as AxiosInstance;
    (axios.create as jest.Mock).mockReturnValueOnce(mockAxiosInstance);

    await throttledGetDataFromApi('/test');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValueOnce({ data: {} }),
    } as unknown as AxiosInstance;
    (axios.create as jest.Mock).mockReturnValueOnce(mockAxiosInstance);

    const relativePath = '/test';
    await throttledGetDataFromApi(relativePath);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const responseData = { id: 1, title: 'Test Data' };
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValueOnce({ data: responseData }),
    } as unknown as AxiosInstance;
    (axios.create as jest.Mock).mockReturnValueOnce(mockAxiosInstance);

    const result = await throttledGetDataFromApi('/test');

    expect(result).toEqual(responseData);
  });
});