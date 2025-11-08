import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: {} }),
    } as unknown as typeof axios);

    const axiosSpy = jest.spyOn(mockedAxios, 'create');
    throttledGetDataFromApi('test');

    expect(axiosSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: { ok: true } });
    mockedAxios.create.mockReturnValue({
      get: getMock,
    } as unknown as typeof axios);

    const promise = throttledGetDataFromApi('/posts/1');
    jest.runAllTimers();
    await promise;

    expect(getMock).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: { ok: true } });
    mockedAxios.create.mockReturnValue({
      get: getMock,
    } as unknown as typeof axios);

    const result = await throttledGetDataFromApi('/posts/1');
    expect(result).toEqual({ ok: true });
  });
});
