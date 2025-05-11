// Uncomment the code below and write your tests
jest.useFakeTimers();
jest.mock('axios');

import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

jest.mock('lodash', () => {
  const original = jest.requireActual('lodash');
  return {
    ...original,
    throttle: jest.fn(
      <T extends (...args: unknown[]) => unknown>(fn: T, wait: number): T => {
        void wait;
        return fn;
      },
    ),
  };
});

describe('throttledGetDataFromApi', () => {
  let mockGet: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGet = jest.fn().mockResolvedValue({ data: { test: 'test1' } });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const url = '/test';
    const promise = throttledGetDataFromApi(url);
    jest.advanceTimersByTime(THROTTLE_TIME);
    await promise;

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const url = '/test';
    const promise = throttledGetDataFromApi(url);
    jest.advanceTimersByTime(THROTTLE_TIME);
    await promise;
    expect(mockGet).toHaveBeenCalledWith(url);
  });

  test('should return response data', async () => {
    const url = '/test';
    const promise = await throttledGetDataFromApi(url);
    jest.advanceTimersByTime(THROTTLE_TIME);
    const result = await promise;
    expect(result).toEqual({ test: 'test1' });
  });
});
