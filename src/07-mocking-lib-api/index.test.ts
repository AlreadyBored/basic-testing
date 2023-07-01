import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const moduleLodash = jest.requireActual('lodash');
  return {
    __esModule: true,
    ...moduleLodash,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const REQUEST_PATH = '/todos';
  const mock = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    mock.create = jest.fn(() => mock);
    mock.get.mockImplementationOnce(() =>
      Promise.resolve({ data: REQUEST_PATH }),
    );
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(REQUEST_PATH);
    expect(mock.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(REQUEST_PATH);
    expect(mock.get).toHaveBeenCalledWith(REQUEST_PATH);
  });

  test('should return response data', async () => {
    mock.get.mockResolvedValueOnce(REQUEST_PATH);
    expect(await throttledGetDataFromApi(REQUEST_PATH)).toEqual(REQUEST_PATH);
  });
});
