import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    await throttledGetDataFromApi('/posts');

    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts';
    await throttledGetDataFromApi(relativePath);

    expect(axios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const responseData = [{ id: 1, title: 'Test' }];
    axios.get.mockResolvedValue({ data: responseData });

    const result = await throttledGetDataFromApi('/posts');

    expect(result).toEqual(responseData);
  });
});