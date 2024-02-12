// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/test');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const path = '/test';
    await throttledGetDataFromApi(path);
    expect(axios.get).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const response = {
      data: 'test data',
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      request: {},
    };
    (axios.get as jest.Mock).mockResolvedValue(response);
    const result = await throttledGetDataFromApi('/test');
    expect(result).toEqual(response.data);
  });
});
