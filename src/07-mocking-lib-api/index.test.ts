import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: (fn: any) => fn,
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    mockedAxios.create.mockReturnValue(mockedAxios);
    mockedAxios.get.mockResolvedValueOnce({ data: {} });

    await throttledGetDataFromApi('/posts/1');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    mockedAxios.create.mockReturnValue(mockedAxios);
    mockedAxios.get.mockResolvedValueOnce({ data: { id: 1 } });

    await throttledGetDataFromApi('/posts/1');

    expect(mockedAxios.get).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockData = { id: 1, title: 'Test Post' };

    mockedAxios.create.mockReturnValue(mockedAxios);
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(mockData);
  });
});
