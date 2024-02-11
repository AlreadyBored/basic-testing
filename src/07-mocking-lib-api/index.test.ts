import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const instance = axios.create();
    const mockBaseUrl = 'http://test.com';
    instance.defaults.baseURL = mockBaseUrl;

    await throttledGetDataFromApi('/test');

    expect(axios.create).toHaveBeenCalled();
    expect(instance.defaults.baseURL).toBe(mockBaseUrl);
  });

  test('should perform request to correct provided url', async () => {
    const instance = axios.create();
    const mockGet = (instance.get = jest
      .fn()
      .mockResolvedValue({ data: 'test data' }));
    const relativePath = '/posts/1';

    await throttledGetDataFromApi(relativePath);

    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const instance = axios.create();
    const mockData = 'test data';
    instance.get = jest.fn().mockResolvedValue({ data: mockData });

    const data = await throttledGetDataFromApi('/test');

    expect(data).toBe(mockData);
  });
});
