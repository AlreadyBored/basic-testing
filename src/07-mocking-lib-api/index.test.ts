// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockedAxios.create.mockReturnValue(mockedAxios);
    mockedAxios.get.mockResolvedValue({ data: { id: 1, title: 'Test Post' } });
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const relativePath = '/posts/1';

    await throttledGetDataFromApi(relativePath);

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts/1';

    mockedAxios.create.mockReturnValue(mockedAxios);
    mockedAxios.get.mockResolvedValue({ data: { id: 1, title: 'Test Post' } });

    await throttledGetDataFromApi(relativePath);
    mockedAxios.get('/posts/1');

    expect(mockedAxios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = '/posts/1';
    const mockData = { id: 1, title: 'Test Post' };

    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(mockData);
  });
});
