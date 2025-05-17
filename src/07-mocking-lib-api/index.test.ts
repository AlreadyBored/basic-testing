import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: 'response' }),
  create: function () {
    return {
      get: this.get.mockReturnValue({ data: 'response' }),
    };
  },
}));

const newUrl = 'test';
const baseUrl = 'https://jsonplaceholder.typicode.com';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const spy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(newUrl);

    expect(spy).toHaveBeenCalledWith({ baseURL: baseUrl });
  });

  test('should perform request to correct provided url', async () => {
    const spy = jest.spyOn(axios.create(), 'get');
    await throttledGetDataFromApi(newUrl);

    expect(spy).toHaveBeenCalledWith(newUrl);
  });

  test('should return response data', async () => {
    const responses = await throttledGetDataFromApi(newUrl);

    expect(responses).toBe('response');
  });
});
