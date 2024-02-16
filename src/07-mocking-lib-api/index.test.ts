import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data: 'data' }));
    const axiosCreate = jest.spyOn(axios, 'create');
    throttledGetDataFromApi('path');
    jest.runAllTimers();
    expect(axiosCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGet = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data: 'data' }));

    throttledGetDataFromApi('path');
    jest.runAllTimers();
    expect(axiosGet).toHaveBeenCalledWith('path');
  });

  test('should return response data', async () => {
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data: 'data' }));

    const data = await throttledGetDataFromApi('path');
    jest.runAllTimers();
    expect(data).toBe('data');
  });
});
