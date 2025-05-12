import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: <T extends (...args: unknown[]) => unknown>(fn: T) => fn,
}));

describe('throttledGetDataFromApi', () => {
  const mockGet = jest.fn();
  const mockCreate = axios.create as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreate.mockReturnValue({ get: mockGet });
  });

  test('should create instance with provided base url', async () => {
    mockGet.mockResolvedValue({ data: {} });

    await throttledGetDataFromApi('/posts');

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    mockGet.mockResolvedValue({ data: {} });

    await throttledGetDataFromApi('/posts');

    expect(mockGet).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    const mockData = { id: 1, title: 'Example' };
    mockGet.mockResolvedValue({ data: mockData });

    const result = await throttledGetDataFromApi('/posts');

    expect(result).toEqual(mockData);
  });
});
