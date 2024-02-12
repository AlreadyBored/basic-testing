import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const mLodash = jest.requireActual('lodash');
  return {
    ...mLodash,
    throttle: jest.fn((f) => f),
  };
});

describe('throttledGetDataFromApi', () => {
  const mock = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    mock.create = jest.fn(() => mock);
    mock.get.mockImplementationOnce(() =>
      Promise.resolve({ data: '/test.txt' }),
    );
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/test.txt');
    expect(mock.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/test.txt');
    expect(mock.get).toHaveBeenCalledWith('/test.txt');
  });

  test('should return response data', async () => {
    mock.get.mockResolvedValueOnce('/test.txt');
    expect(await throttledGetDataFromApi('/test.txt')).toEqual('/test.txt');
  });
});
