import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => {
  return {
    create: () => {
      return {
        get: jest.fn().mockImplementation((path: string) => ({ data: path })),
      };
    },
  };
});

jest.mock('lodash', () => {
  return {
    throttle: jest.fn().mockImplementation((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const create = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('todos');
    expect(create).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const requestedUrl = 'todos';
    const data = await throttledGetDataFromApi(requestedUrl);
    expect(data).toBe(requestedUrl);
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi('todos');
    expect(data).toBeTruthy();
  });
});
