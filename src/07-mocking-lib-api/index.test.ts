// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

type AxiosResponse = {
  data: string;
};

type ApiTestSettings = {
  URL: string;
  Endpoint: string;
  Response: AxiosResponse;
};

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const settings: ApiTestSettings = {
    URL: 'https://jsonplaceholder.typicode.com',
    Endpoint: '/todos/1',
    Response: { data: 'response' },
  };
  let AxiosGetSpy: jest.SpyInstance;

  beforeEach(() => {
    AxiosGetSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue(settings.Response);
  });

  test('should create an instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(settings.Endpoint);

    expect(axiosCreateSpy).toHaveBeenCalledTimes(1);
    expect(axiosCreateSpy).toHaveBeenCalledWith({ baseURL: settings.URL });
  });

  test('should perform a request to the correct provided url', async () => {
    await throttledGetDataFromApi(settings.URL);

    expect(AxiosGetSpy).toHaveBeenCalledTimes(1);
    expect(AxiosGetSpy).toHaveBeenCalledWith(settings.URL);
  });

  test('should return response data', async () => {
    const responseData = await throttledGetDataFromApi(settings.Endpoint);

    expect(responseData).toEqual(settings.Response.data);
  });
});
