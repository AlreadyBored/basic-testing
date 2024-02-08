import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn().mockImplementation((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const endPoint = 'albums/1';

  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValueOnce({ data: 'data' }); // mock axios.get because we don't need it in this test

    await throttledGetDataFromApi(endPoint);

    expect(createSpy).toBeCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const getSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValueOnce({ data: 'data' }); // mock axios.get because we don't need it in this test

    await throttledGetDataFromApi(endPoint);

    expect(getSpy).toBeCalledTimes(1);
    expect(getSpy).toBeCalledWith(endPoint);
  });

  test('should return response data', async () => {
    expect(await throttledGetDataFromApi(endPoint)).toBeDefined(); // get real api response
  });
});
