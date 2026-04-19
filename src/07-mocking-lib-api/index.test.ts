import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const actual = jest.requireActual<typeof import('lodash')>('lodash');
  return {
    ...actual,
    throttle: (fn: (...args: unknown[]) => unknown) => fn,
  };
});

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  const getMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    getMock.mockResolvedValue({ data: { id: 1, title: 'post' } });
    mockedAxios.create.mockReturnValue({
      get: getMock,
    } as unknown as ReturnType<typeof axios.create>);
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/posts/1');

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/posts/1');

    expect(getMock).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual({ id: 1, title: 'post' });
  });
});
