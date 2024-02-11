import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const relativePath = 'todos/1';
let spy: jest.SpyInstance;

jest.mock('axios');

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: jest.fn((callback) => callback),
}));

describe('throttledGetDataFromApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  afterAll(() => {
    spy.mockRestore();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    spy.mockReset();
  });

  beforeEach(() => {
    mockedAxios.create = jest.fn(() => mockedAxios);
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve('response'));
  });

  test('should create instance with provided base url', async () => {
    spy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(relativePath);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith({ baseURL: BASE_URL });
  });

  test('should perform request to correct provided url', async () => {
    spy = jest.spyOn(axios.create(), 'get');
    expect(spy).not.toBeCalled();

    await throttledGetDataFromApi(relativePath);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const response = 'response';
    const getMock = jest.fn(async () => ({ data: response }));
    mockedAxios.create.mockReturnValue({ get: getMock } as never);

    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toBe(response);
  });
});
