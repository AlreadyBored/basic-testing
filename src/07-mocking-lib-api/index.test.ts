import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: { id: 1, title: 'Test post' } }),
    });

    await throttledGetDataFromApi('/test');

    expect(axios.create).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: { id: 1, title: 'Test post' } }),
    });

    await throttledGetDataFromApi('/test');
    jest.runAllTimers();

    const axiosInstance = axios.create();
    expect(axiosInstance.get).toBeCalledWith('/test');
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: { id: 1, title: 'Test post' } }),
    });
  });

  test('should return response data', async () => {
    const responseData = { id: 1, title: 'Test post' };
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: responseData }),
    });

    const data = await throttledGetDataFromApi('/test');

    expect(data).toBe(responseData);
  });
});