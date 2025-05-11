// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

describe('throttledGetDataFromApi', () => {
  jest.mock('axios');

  test('should create instance with provided base url', async () => {
    jest.useFakeTimers();

    const data = { test: 'test' };
    const relativePath = '/test';

    const mockCreate = jest
      .fn()
      .mockReturnValue({ get: jest.fn().mockResolvedValue(data) });
    (axios.create as jest.Mock) = mockCreate;

    await throttledGetDataFromApi(relativePath);

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });

    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('should perform request to correct provided url', async () => {
    jest.useFakeTimers();

    const data = { test: 'test' };
    const relativePath = '/test';

    const mockGet = jest.fn().mockResolvedValue({ data });
    const mockCreate = jest.fn().mockReturnValue({ get: mockGet });
    (axios.create as jest.Mock) = mockCreate;

    jest.advanceTimersByTime(THROTTLE_TIME);

    await throttledGetDataFromApi(relativePath);

    expect(mockGet).toHaveBeenCalledWith(relativePath);

    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  test('should return response data', async () => {
    jest.useFakeTimers();

    const data = { test: 'test' };
    const relativePath = '/test';

    const mockGet = jest.fn().mockResolvedValue({ data });
    const mockCreate = jest.fn().mockReturnValue({ get: mockGet });
    (axios.create as jest.Mock) = mockCreate;

    jest.advanceTimersByTime(THROTTLE_TIME);

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(data);

    jest.useFakeTimers();
    jest.clearAllMocks();
  });
});
