/* eslint-disable @typescript-eslint/no-explicit-any */
// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => ({
  throttle: (fn: any) => fn,
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: { test: 'data' } }),
    };

    const createAxiosSpy = jest.spyOn(axios, 'create');
    createAxiosSpy.mockReturnValue(mockAxiosInstance as any);

    await throttledGetDataFromApi('/posts/1');

    expect(createAxiosSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: { test: 'data' } });
    const mockAxiosInstance = {
      get: mockGet,
    };

    jest.spyOn(axios, 'create').mockReturnValue(mockAxiosInstance as any);

    await throttledGetDataFromApi('/posts/1');

    expect(mockGet).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const mockData = jest.fn().mockResolvedValue({ data: { test: 'data' } });
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: mockData }),
    };

    jest.spyOn(axios, 'create').mockReturnValue(mockAxiosInstance as any);

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(mockData);
  });
});
