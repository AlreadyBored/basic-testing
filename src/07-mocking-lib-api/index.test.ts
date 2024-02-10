// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const mockedData = 'mocked data';
jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: jest.fn().mockImplementation((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  let jestSpy: jest.SpyInstance;
  beforeEach(() => {
    jest.mock('axios');
    jestSpy = jest.fn().mockResolvedValue({ data: mockedData });
    axios.create = jest.fn().mockImplementation(() => ({
      get: jestSpy,
    }));
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/posts');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/posts');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    expect(jestSpy).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('/posts');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });

    expect(result).toBe(mockedData);
  });
});
