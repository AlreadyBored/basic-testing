// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const original = jest.requireActual('lodash');
  return {
    ...original,
    throttle: (fn: any) => fn,
  };
});

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');

    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: 'test data' }),
    } as any);

    await throttledGetDataFromApi('/posts/1');

    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: 'test data'});

    mockedAxios.create.mockReturnValue({
      get: getMock,
    } as any);
    await throttledGetDataFromApi('/posts/123');
    expect(getMock).toHaveBeenCalledWith('/posts/123');
  });

  test('should return response data', async () => {
     mockedAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: { id: 1, title: 'hello' } }),
    } as any);
    const data = await throttledGetDataFromApi('/posts/1');
    expect(data).toEqual({ id: 1, title: 'hello' });
  });
});
