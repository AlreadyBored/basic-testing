// Uncomment the code below and write your tests
jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
  },
}));

jest.mock('lodash', () => ({
  __esModule: true,
  throttle: jest.fn((fn: unknown) => fn),
}));

import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const mockedAxios = axios as unknown as {
  create: jest.Mock;
};

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const get = jest.fn().mockResolvedValue({ data: { ok: true } });
    mockedAxios.create.mockReturnValue({ get });

    await throttledGetDataFromApi('/posts');

    expect(mockedAxios.create).toHaveBeenCalledTimes(1);
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const get = jest.fn().mockResolvedValue({ data: {} });
    mockedAxios.create.mockReturnValue({ get });

    const path = '/todos/3';

    await throttledGetDataFromApi(path);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const payload = { id: 1, title: 'hello' };
    const get = jest.fn().mockResolvedValue({ data: payload });
    mockedAxios.create.mockReturnValue({ get });

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(payload);
  });
});
