import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: (fn: (...args: unknown[]) => unknown) => fn,
}));

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', () => {
    const createSpy = jest.spyOn(axios, 'create').mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: {} }),
    } as never);

    throttledGetDataFromApi('/');

    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts/1';
    const getSpy = jest.fn().mockResolvedValue({ data: {} });

    jest.spyOn(axios, 'create').mockReturnValue({ get: getSpy } as never);

    await throttledGetDataFromApi(relativePath);

    expect(getSpy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockResponse = { data: 'mock data' };

    jest.spyOn(axios, 'create').mockReturnValue({
      get: jest.fn().mockResolvedValue(mockResponse),
    } as never);

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(mockResponse.data);
  });
});
