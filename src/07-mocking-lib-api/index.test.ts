import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

jest.mock('axios', () => ({ create: jest.fn() }));

const data = { validData: 'validData' };

beforeEach(() => {
  jest.useFakeTimers();
  const mockedCreate = { get: jest.fn(() => Promise.resolve({ data })) };
  (axios.create as jest.Mock).mockReturnValue(mockedCreate);
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe('throttledGetDataFromApi', () => {
  const path = 'joppka';
  const url = { baseURL: 'https://jsonplaceholder.typicode.com' };

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(path);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(axios.create).toHaveBeenCalledWith(url);
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(path);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(axios.create().get).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(path);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(result).toEqual(data);
  });
});
