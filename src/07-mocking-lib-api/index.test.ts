import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => ({
  throttle: (fn: void) => fn,
}));

describe('throttledGetDataFromApi', () => {
  let mockedGet = jest.fn();
  let mockedCreate = jest.fn();

  beforeEach(() => {
    mockedGet = jest.fn().mockResolvedValue({ data: 'test data' });
    mockedCreate = jest.fn().mockReturnValue({ get: mockedGet });

    (axios.create as jest.Mock).mockImplementation(mockedCreate);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/posts');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/posts');

    expect(mockedGet).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi('/posts');

    expect(response).toBe('test data');
  });
});
