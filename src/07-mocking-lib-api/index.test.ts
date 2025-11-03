// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const original = jest.requireActual('lodash');
  return {
    ...original,
    throttle: <T extends (...args: unknown[]) => unknown>(fn: T) => fn,
  };
});

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');

    const mockInstance: Partial<AxiosInstance> = {
      get: jest.fn().mockResolvedValue({ data: 'test data' }),
    };

    mockedAxios.create.mockReturnValue(mockInstance as AxiosInstance);

    await throttledGetDataFromApi('/posts/1');

    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: 'test data' });

    const mockInstance: Partial<AxiosInstance> = {
      get: getMock,
    };

    mockedAxios.create.mockReturnValue(mockInstance as AxiosInstance);

    await throttledGetDataFromApi('/posts/123');
    expect(getMock).toHaveBeenCalledWith('/posts/123');
  });

  test('should return response data', async () => {
    const mockResponseData = { id: 1, title: 'hello' };
    const mockInstance: Partial<AxiosInstance> = {
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
    };
    mockedAxios.create.mockReturnValue(mockInstance as AxiosInstance);
    const data = await throttledGetDataFromApi('/posts/1');
    expect(data).toEqual(mockResponseData);
  });
});
