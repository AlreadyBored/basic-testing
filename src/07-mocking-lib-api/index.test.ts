// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => ({
  throttle: jest.fn((fn: any) => fn), // Мокаем throttle, чтобы он не ограничивал вызовы
}));
describe('throttledGetDataFromApi', () => {
  const mockAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    // Write your test here
    // arrange
    mockAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: {} }),
    });

    // act
    await throttledGetDataFromApi('/posts/1');

    // assert
    expect(mockAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    mockAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: {} }),
    });

    // act
    await throttledGetDataFromApi('/posts/1');

    // assert
    expect(mockAxios.create().get).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    // Write your test here
    const mockData = { title: 'test data' };

    mockAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    });

    // act
    const result = await throttledGetDataFromApi('/posts/1');

    // assert
    expect(result).toEqual(mockData);
  });
});
