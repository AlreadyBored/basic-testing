import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: (fn: unknown) => fn as typeof fn,
}));

describe('throttledGetDataFromApi', () => {
  let mockCreate: jest.Mock;
  let mockGet: jest.Mock;

  beforeEach(() => {
    mockGet = jest.fn().mockResolvedValue({ data: 'mocked data' });
    mockCreate = jest.fn(() => ({
      get: mockGet,
    }));

    (axios.create as jest.Mock) = mockCreate;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/data');
    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/user/1');
    expect(mockGet).toHaveBeenCalledWith('/user/1');
  });

  test('should return response data', async () => {
    const data = 'user data';

    mockGet.mockResolvedValueOnce({ data });
    const result = await throttledGetDataFromApi('/user/1');
    expect(result).toBe(data);
  });
});
