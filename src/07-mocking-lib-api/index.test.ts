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
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValue({});

    await throttledGetDataFromApi('https://jsonplaceholder.typicode.com/todos');

    jest.runAllTimers();

    expect(axiosCreateSpy.mock.calls[0]?.[0]).toStrictEqual({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const reqUrl = 'https://jsonplaceholder.typicode.com/todos';
    const axiosGetSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({});

    await throttledGetDataFromApi(reqUrl);

    jest.runAllTimers();

    expect(axiosGetSpy.mock.calls[0]?.[0]).toBe(reqUrl);
  });

  test('should return response data', async () => {
    const reqUrl = 'https://jsonplaceholder.typicode.com/todos';
    const response = { data: 'test-data' };

    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: response });

    const result = await throttledGetDataFromApi(reqUrl);

    jest.runAllTimers();

    expect(result).toStrictEqual(response);
  });
});
