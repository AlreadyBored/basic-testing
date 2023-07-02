// Uncomment the code below and write your tests
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
    const spyOn = jest.spyOn(axios, 'create');
    const baseURL = 'https://jsonplaceholder.typicode.com';

    await throttledGetDataFromApi('/posts');

    expect(spyOn).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
  });

  test('should return response data', async () => {
    // Write your test here
  });
});
