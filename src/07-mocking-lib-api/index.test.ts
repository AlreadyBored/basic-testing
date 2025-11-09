import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';
  const newUrl = '/test';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setupMockGet = (responseData: unknown) => {
    const mockGet = jest.fn().mockResolvedValue({ data: responseData });
    (axios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });
    return mockGet;
  };

  test('should create instance with provided base url', async () => {
    setupMockGet('response');
    const spy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(newUrl);

    expect(spy).toHaveBeenCalledWith({ baseURL: baseUrl });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = setupMockGet({});

    await throttledGetDataFromApi(newUrl);

    expect(mockGet).toHaveBeenCalledWith(newUrl);
  });

  test('should return response data', async () => {
    const mockData = { title: 'test' };
    setupMockGet(mockData);

    const result = await throttledGetDataFromApi(newUrl);

    expect(result).toEqual(mockData);
  });
});
