import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';
import { getDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosClient: AxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'Response data' }),
    } as unknown as AxiosInstance;

    jest.spyOn(axios, 'create').mockReturnValue(axiosClient);

    await getDataFromApi('/posts');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosClient: AxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'Response data' }),
    } as unknown as AxiosInstance;

    jest.spyOn(axios, 'create').mockReturnValue(axiosClient);

    const result = await throttledGetDataFromApi('/posts');

    expect(axiosClient.get).toHaveBeenCalledWith('/posts');
    expect(result).toBe('Response data');
  });

  test('should return response data', async () => {
    const axiosClient: AxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'Response data' }),
    } as unknown as AxiosInstance;

    jest.spyOn(axios, 'create').mockReturnValue(axiosClient);

    const result = await throttledGetDataFromApi('/posts');

    expect(result).toBe('Response data');
  });
});
