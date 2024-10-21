import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  let mockAxiosClient: Partial<AxiosInstance>;

  beforeEach(() => {
    mockAxiosClient = {
      get: jest.fn(),
    };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    mockAxiosClient.get = jest.fn().mockResolvedValueOnce({});
    await throttledGetDataFromApi('/');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    mockAxiosClient.get = jest.fn().mockResolvedValueOnce({});
    await throttledGetDataFromApi('/');
    expect(mockAxiosClient.get).toHaveBeenCalledWith('/');
  });

  test('should return response data', async () => {
    mockAxiosClient.get = jest
      .fn()
      .mockResolvedValueOnce({ data: 'test data' });
    const result = await throttledGetDataFromApi('/');
    expect(result).toEqual('test data');
  });
});
