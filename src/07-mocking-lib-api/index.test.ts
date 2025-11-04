import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  let axiosClientMock: { get: jest.Mock };

  beforeEach(() => {
    jest.useFakeTimers();
    axiosClientMock = {
      get: jest.fn().mockResolvedValue({ data: 'mocked response' }),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosClientMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/posts/1');
    jest.runAllTimers();

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/posts/1');
    jest.runAllTimers();

    expect(axiosClientMock.get).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('/posts/1');
    jest.runAllTimers();

    expect(result).toBe('mocked response');
  });
});
