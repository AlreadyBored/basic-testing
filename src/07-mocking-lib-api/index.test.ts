// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: 'url/posts1' }),
      defaults: { baseURL: 'url' },
    } as never);
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/posts1');

    expect(mockedAxios.create).toHaveBeenCalled();

    expect(mockedAxios.create().defaults).toHaveProperty('baseURL', 'url');
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/posts1');

    expect(mockedAxios.create().get).toHaveBeenCalledWith('/posts1');
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('/posts1');

    expect(result).toBe('url/posts1');
  });
});
