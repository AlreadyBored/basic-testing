// Uncomment the code below and write your tests
// /* import axios from 'axios';
// import { throttledGetDataFromApi } from './index'; */

import axios from 'axios';
// import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    axios.create({
      baseURL: 'https://hello.com',
    });
    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://hello.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/hello';
    const client = axios.create({
      baseURL: 'https://hello.com',
    });
    const getSpy = jest.spyOn(client, 'get');
    getSpy.mockResolvedValueOnce(Promise.resolve({ data: {} }));
    const thr = jest.fn();
    thr.mockReturnValue(Promise.resolve({ data: {} }));
    const data = await thr(relativePath);
    expect(data).toStrictEqual({ data: {} });
  });

  test('should return response data', async () => {
    // Write your test here
  });
});
