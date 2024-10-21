import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'content' }),
    } as unknown as jest.Mocked<typeof axios>;
    mockedAxios.create.mockReturnValue(axiosInstance);
    jest.advanceTimersByTime(5000);
    await throttledGetDataFromApi('123');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'content' }),
    } as unknown as jest.Mocked<typeof axios>;
    mockedAxios.create.mockReturnValue(axiosInstance);
    const promise = throttledGetDataFromApi('123');
    jest.advanceTimersByTime(5000);
    await promise;
    expect(axiosInstance.get).toHaveBeenCalledWith('123');
  });

  test('should return response data', async () => {
    const axiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'content' }),
    } as unknown as jest.Mocked<typeof axios>;
    mockedAxios.create.mockReturnValue(axiosInstance);
    jest.advanceTimersByTime(5000);
    const result = await throttledGetDataFromApi('123');
    expect(result).toEqual('content');
  });
});
