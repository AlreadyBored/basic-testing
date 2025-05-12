import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('lodash', () => ({
  throttle: (fn: Function) => fn,
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'test' });
    const mockCreate = jest.fn().mockReturnValue({ get: mockGet });
    mockedAxios.create = mockCreate;
    await throttledGetDataFromApi('/test');
    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'test' });
    mockedAxios.create = jest.fn().mockReturnValue({
      get: mockGet,
    });
    await throttledGetDataFromApi('/dashboard');
    expect(mockGet).toHaveBeenCalledWith('/dashboard');
  });

  test('should return response data', async () => {
    const mockData = { id: 1, name: 'Test User' };
    const mockGet = jest.fn().mockResolvedValue({ data: mockData });
    mockedAxios.create = jest.fn().mockReturnValue({
      get: mockGet,
    });
    const result = await throttledGetDataFromApi('/dashboard/users/1');
    expect(result).toEqual(mockData);
  });
});
