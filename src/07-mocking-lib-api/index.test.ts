// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const fakeApiUrl = 'https://jsonplaceholder.typicode.com';
const fakeApiQuery = '/users';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const spyOnAxios = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(fakeApiQuery);

    expect(spyOnAxios).toHaveBeenCalledWith({ baseURL: fakeApiUrl });
  });

  test('should perform request to correct provided url', async () => {
    const spyOnAxios = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi(fakeApiQuery);

    jest.runAllTimers();
    expect(spyOnAxios).toHaveBeenCalledWith(fakeApiQuery);
  });

  test('should return response data', async () => {
    const userId = 1;
    const mockedResponse = [{ id: userId }, { id: userId + 1 }];

    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockedResponse });

    const result = await throttledGetDataFromApi('/users');

    expect(result[0].id).toBe(userId);
    expect(result[1].id).toBe(userId + 1);
    expect(typeof result[0].name).toBe('string');
    expect(typeof result[1].name).toBe('string');
  });
});
