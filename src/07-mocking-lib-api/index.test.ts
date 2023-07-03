// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

const testValue = 'test';
const baseURL = 'https://jsonplaceholder.typicode.com';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  test('should create instance with provided base url', async () => {
    mockedAxios.create = jest.fn().mockReturnThis();
    mockedAxios.get = jest
      .fn()
      .mockResolvedValue((value: string) => ({ data: value }));
    await throttledGetDataFromApi('');
    expect(mockedAxios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    mockedAxios.create = jest.fn().mockReturnThis();
    mockedAxios.get = jest
      .fn()
      .mockResolvedValue((value: string) => ({ data: value }));
    await throttledGetDataFromApi(testValue);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(mockedAxios.get).toHaveBeenCalledWith(testValue);
  });

  test('should return response data', async () => {
    mockedAxios.create = jest.fn().mockReturnThis();
    mockedAxios.get = jest.fn().mockResolvedValue({ data: testValue });
    const resData = await throttledGetDataFromApi(testValue);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(resData).toBe(testValue);
  });
});
