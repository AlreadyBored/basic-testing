import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const mockData = { id: 1, title: 'Test Post' };
  const relativePath = '/posts/1';
  let getMock: jest.Mock<Promise<{ data: typeof mockData }>, [string]>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    getMock = jest.fn().mockResolvedValue({ data: mockData });

    (axios.create as jest.MockedFunction<typeof axios.create>).mockReturnValue({
      get: getMock,
    } as unknown as AxiosInstance);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const promise = throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(THROTTLE_TIME);
    await promise;

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const promise = throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(THROTTLE_TIME);
    await promise;

    expect(getMock).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const promise = throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(THROTTLE_TIME);
    const result = await promise;

    expect(result).toEqual(mockData);
  });
});
