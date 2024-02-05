// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const url = '/posts';
const baseURL = 'https://jsonplaceholder.typicode.com';
const data = { content: 'some content' };

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const getter = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data }));

    axios.create = jest.fn().mockImplementation(() => ({
      baseURL,
      get: getter,
    }));

    await throttledGetDataFromApi(url);
    jest.runAllTimers();
    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const getter = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data }));

    axios.create = jest.fn().mockImplementation(() => ({
      baseURL,
      get: getter,
    }));

    await throttledGetDataFromApi(url);
    jest.runAllTimers();
    expect(getter).toHaveBeenCalledWith(url);
  });

  test('should return response data', async () => {
    const getter = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data }));

    axios.create = jest.fn().mockImplementation(() => ({
      baseURL,
      get: getter,
    }));

    const result = await throttledGetDataFromApi(url);
    jest.runAllTimers();
    expect(result).toBe(data);
  });
});
