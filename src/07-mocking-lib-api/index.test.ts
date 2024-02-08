import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn().mockImplementation((fn) => fn),
}));

// jest.mock('axios', () => ({
//   // ...jest.requireActual<typeof import('axios')>('axios'),
//   create: () => axios,
//   get: () => Promise.resolve({ data: 'data' }),
// }));

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const endPoint = 'albums/1';

  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(endPoint);

    expect(createSpy).toBeCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    // const instance = axios.create({ baseURL });
    // jest.spyOn(axios, 'create').mockImplementation(() => instance);
    const getSpy = jest.spyOn(axios.Axios.prototype, 'get');

    await throttledGetDataFromApi(endPoint);

    expect(getSpy).toBeCalledTimes(1);
    expect(getSpy).toBeCalledWith(endPoint);
  });

  test('should return response data', async () => {
    expect(await throttledGetDataFromApi(endPoint)).toBeDefined();
  });
});
