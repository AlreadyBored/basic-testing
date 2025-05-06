import { throttledGetDataFromApi } from '07-mocking-lib-api';
import axios from 'axios';

describe('throttledGetDataFromApi', () => {
  let createMock: jest.SpyInstance;
  let getMock: jest.Mock;

  beforeEach(() => {
    jest.resetModules();
    getMock = jest.fn();
    createMock = jest.spyOn(axios, 'create').mockReturnValue({
      get: getMock,
    } as unknown as import('axios').AxiosInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    getMock.mockResolvedValue({ data: {} });

    await throttledGetDataFromApi('/posts');
    expect(createMock).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    getMock.mockResolvedValue({ data: {} });
    await throttledGetDataFromApi('/users');
    expect(getMock).toHaveBeenCalledWith('/users');
  });

  test('should return response data', async () => {
    const mockData = { foo: 'bar' };
    getMock.mockResolvedValue({ data: mockData });
    const result = await throttledGetDataFromApi('/data');
    expect(result).toEqual(mockData);
  });
});
