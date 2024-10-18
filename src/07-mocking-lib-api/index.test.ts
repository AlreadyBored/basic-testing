// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const baseURL = 'https://jsonplaceholder.typicode.com';
const relativePath = '/todos/1';

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

jest.mock('axios');

const mAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    mAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: relativePath }),
      defaults: { baseURL },
    } as never);
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(baseURL);

    expect(mAxios.create).toHaveBeenCalled();
    expect(mAxios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(mAxios.create().get).toHaveBeenCalled();
    expect(mAxios.create().get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi(relativePath);

    expect(data).toBe(relativePath);
  });
});
