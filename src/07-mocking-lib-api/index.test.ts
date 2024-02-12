import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    axios.create = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: {} }),
    });
    await throttledGetDataFromApi('/users');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getSpy = jest.fn().mockResolvedValue({ data: {} });
    axios.create = jest.fn().mockReturnValue({ get: getSpy });
    throttledGetDataFromApi('/users');
    jest.advanceTimersByTime(5000);
    expect(getSpy).toHaveBeenCalledWith('/users');
  });

  test('should return response data', async () => {
    const mockData = { data: 'test' };
    axios.create = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue(mockData),
    });
    const data = await throttledGetDataFromApi('/users');
    expect(data).toBe(mockData.data);
  });
});