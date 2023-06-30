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
    const axiosCreateMock = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('/users');
    jest.runAllTimers();

    const passedBaseUrl = axiosCreateMock.mock.calls[0]?.[0]?.baseURL;
    const returnedInstance = axiosCreateMock.mock.results[0]?.value;
    expect(returnedInstance.defaults.baseURL).toBe(passedBaseUrl);

    axiosCreateMock.mockRestore();
  });

  test('should perform request to correct provided url', async () => {
    const axiosGetMock = jest.spyOn(axios.Axios.prototype, 'get');
    const path = '/users';

    await throttledGetDataFromApi(path);
    jest.runAllTimers();

    const relativePath = axiosGetMock.mock.calls[0]?.[0];
    expect(relativePath).toBe(path);

    axiosGetMock.mockRestore();
  });

  test('should return response data', async () => {
    const returnedData = { data: [{ user: 'Vladimir' }] };
    const axiosGetMock = jest.spyOn(axios.Axios.prototype, 'get');
    axiosGetMock.mockResolvedValue(returnedData);

    const result = await throttledGetDataFromApi('users');
    jest.runAllTimers();

    await expect(result).toBe(returnedData.data);

    axiosGetMock.mockRestore();
  });
});
