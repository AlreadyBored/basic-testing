// Uncomment the code below and write your tests
import { throttledGetDataFromApi } from './index';
import axios from 'axios';

jest.mock('axios');
jest.mock('lodash', () => ({
  __esModule: true,
  ...jest.requireActual<typeof import('lodash')>('lodash'),
  throttle: jest.fn((fn: () => void) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const path = 'users';
  const mock = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    mock.create = jest.fn(() => mock);
    mock.get.mockImplementationOnce(() => Promise.resolve({ data: path }));
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(path);
    expect(mock.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(path);
    expect(mock.get).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(path);
    expect(result).toEqual(path);
  });
});
