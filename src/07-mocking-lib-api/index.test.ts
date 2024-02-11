// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: 'mocked data' }),
  create: function () {
    return {
      get: this.get.mockResolvedValue({ data: 'mocked data' }),
    };
  },
}));

jest.mock('lodash', () => {
  return {
    throttle: jest.fn((fn) => fn),
  };
});
describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/test');
    expect(axiosSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/urltest');
    expect(axios.create().get).toHaveBeenCalledWith('/urltest');
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi('/urltest');
    expect(data).toEqual('mocked data');
  });
});
