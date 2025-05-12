// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: (fn: unknown) => fn,
}));

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const givenAxiosGetReturns = (payload: unknown) => {
    const get = jest.fn().mockResolvedValue({ data: payload });
    mockedAxios.create.mockReturnValue({ get } as unknown as AxiosInstance);
    return get;
  };

  it('should create instance with provided base url', async () => {
    givenAxiosGetReturns({});

    await throttledGetDataFromApi('/todos/1');

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  it('should perform request to correct provided url', async () => {
    const path = '/posts/2';
    const getSpy = givenAxiosGetReturns({});

    await throttledGetDataFromApi(path);

    expect(getSpy).toHaveBeenCalledWith(path);
  });

  it('should return response data', async () => {
    const fakeData = { id: 42, title: 'Answer' };
    givenAxiosGetReturns(fakeData);

    const result = await throttledGetDataFromApi('/anything');

    expect(result).toEqual(fakeData);
  });
});
