import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: 'mocked data' }),
  create() {
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
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/test');
    expect(axiosSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    axiosSpy.mockRestore();
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/test');
    expect(axios.create().get).toHaveBeenCalledWith('/test');
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi('/test');
    expect(data).toEqual('mocked data');
  });
});
