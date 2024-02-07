// Uncomment the code below and write your tests
import axios, { Axios } from 'axios';
import { throttledGetDataFromApi } from './index';

const url = '/posts/1';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    throttledGetDataFromApi(url);
    jest.runAllTimers();
    expect(axiosCreateSpy).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGetSpy = jest.spyOn(Axios.prototype, 'get');
    throttledGetDataFromApi(url);
    jest.runAllTimers();
    expect(axiosGetSpy).toBeCalledWith(url);
  });

  test('should return response data', async () => {
    expect(throttledGetDataFromApi(url)).resolves.toMatchObject({ id: 1 });
  });
});
