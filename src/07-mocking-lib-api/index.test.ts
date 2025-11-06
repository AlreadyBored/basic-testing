import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const THROTTLE_TIME = 5000;

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  () => {
    jest.useRealTimers();
  };

  let mockGet: jest.Mock;
  beforeEach(() => {
    mockGet = jest.fn().mockResolvedValue({ data: [] });
    mockedAxios.create.mockReturnValue({ get: mockGet } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/posts');
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/posts');
    jest.advanceTimersByTime(THROTTLE_TIME);
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi('/posts');
    expect(data).toEqual([]);
  });
});
