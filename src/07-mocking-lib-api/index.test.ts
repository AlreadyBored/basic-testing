import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const url = 'https://jsonplaceholder.typicode.com';

jest.mock('lodash', () => ({
  throttle: (fn: () => unknown) => fn,
}));

describe('throttledGetDataFromApi', () => {
  const relativePath = '/posts/1';

  test('should create instance with provided base url', async () => {
    jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    expect(axios.create).toHaveBeenCalledWith({ baseURL: url });
  });

  test('should perform request to correct provided url', async () => {
    const get = jest.fn().mockResolvedValue({ data: {} });
    axios.create = jest.fn().mockReturnValue({ get: get });
    await throttledGetDataFromApi(relativePath);
    expect(get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const response = { id: 1 };
    const get = jest.fn().mockResolvedValue({ data: response });
    axios.create = jest.fn().mockReturnValue({ get });
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toEqual(response);
  });
});
