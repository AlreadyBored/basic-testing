import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn().mockImplementation((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  let axiosGetSpy: jest.SpyInstance;
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const endPoint = 'some endpoint';
  const response = { data: 'some response' };

  beforeEach(() => {
    axiosGetSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValueOnce({ data: response });
  });

  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(endPoint);

    expect(createSpy).toBeCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(endPoint);

    expect(axiosGetSpy).toBeCalledTimes(1);
    expect(axiosGetSpy).toBeCalledWith(endPoint);
  });

  test('should return response data', async () => {
    expect(await throttledGetDataFromApi(endPoint)).toStrictEqual(response);
  });
});
