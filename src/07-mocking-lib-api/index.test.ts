import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const relativePath = '/posts';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const spyCreateAxios = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(spyCreateAxios).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const spyGetAxios = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(spyGetAxios).toHaveBeenCalledTimes(1);
  });

  test('should return response data', async () => {
    const relativePath = '/posts';
    const responseDataMock = { data: 'mocked data' };
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: responseDataMock });
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toEqual(responseDataMock);
  });
});
