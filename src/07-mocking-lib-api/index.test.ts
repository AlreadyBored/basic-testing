// Uncomment the code below and write your tests
import axios, { AxiosStatic } from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

const baseURL = 'https://jsonplaceholder.typicode.com';
const url = '/users';
const mockResponse = { data: [] };

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreate = jest.spyOn(axios, 'create');
    const axiosGet = jest.spyOn(axios, 'get');

    axiosCreate.mockReturnValue({
      get: jest.fn(async () => mockResponse),
    } as unknown as AxiosStatic);

    axiosGet.mockResolvedValue(mockResponse);

    await throttledGetDataFromApi(url);

    expect(axiosCreate).toHaveBeenLastCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const axiosCreate = jest.spyOn(axios, 'create');
    const axiosGet = jest.spyOn(axios, 'get');

    axiosCreate.mockReturnValue({
      get: jest.fn(async () => mockResponse),
    } as unknown as AxiosStatic);

    axiosGet.mockResolvedValue(mockResponse);

    await throttledGetDataFromApi(url);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(axiosCreate).toHaveBeenLastCalledWith({ baseURL });
  });

  test('should return response data', async () => {
    const axiosCreate = jest.spyOn(axios, 'create');
    const axiosGet = jest.spyOn(axios, 'get');

    axiosCreate.mockReturnValue({
      get: jest.fn(async () => mockResponse),
    } as unknown as AxiosStatic);

    axiosGet.mockResolvedValue(mockResponse);

    return expect(throttledGetDataFromApi(url)).resolves.toBe(
      mockResponse.data,
    );
  });
});
