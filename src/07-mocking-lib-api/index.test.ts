import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const users = [{ name: 'Sam' }];
const resp = { data: users };

jest.mock('axios', () => ({
  create: () => axios,
  get: () => Promise.resolve(resp),
}));

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('should create instance with provided base url', async () => {
    const createJestSpy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('anyPath');
    jest.runAllTimers();
    const baseURL = createJestSpy.mock.calls[0]?.[0]?.baseURL;

    expect(baseURL).toEqual('https://jsonplaceholder.typicode.com');
  });

  test('should perform request to correct provided url', async () => {
    const getJestSpy = jest.spyOn(axios, 'get');

    await throttledGetDataFromApi('anyPath');
    jest.runAllTimers();
    const path = getJestSpy.mock.calls[0]?.[0];

    expect(path).toBe('anyPath');
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi('anyPath');
    jest.runAllTimers();

    expect(data).toEqual(users);
  });
});