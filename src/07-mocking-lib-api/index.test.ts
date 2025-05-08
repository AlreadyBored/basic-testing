import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const mockGet = jest.fn();

  beforeEach(() => {
    mockedAxios.create.mockReturnValue({
      get: mockGet,
      defaults: { baseURL: '' },
    } as unknown as AxiosInstance);

    mockGet.mockResolvedValue({ data: {} });
  });

  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('/posts/1');

    expect(axiosCreateSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    mockGet.mockResolvedValue({
      data: { id: 1, title: 'Mocked Post' },
    });

    await throttledGetDataFromApi('/posts/1');

    expect(mockGet).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const mockResponseData = { id: 1, title: 'Mocked Post' };
    mockGet.mockResolvedValue({ data: mockResponseData });

    const response = await throttledGetDataFromApi('/posts/1');

    expect(response).toEqual(mockResponseData);
  });
});
