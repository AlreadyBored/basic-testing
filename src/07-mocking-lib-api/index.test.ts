import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  let mockAxiosInstance: { get: jest.Mock };

  beforeEach(() => {
    jest.clearAllMocks();
    mockAxiosInstance = { get: jest.fn() };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);
  });

  test('should create instance with provided base url', async () => {
    const relativePath = '/users';
    mockAxiosInstance.get.mockResolvedValue({ data: {} });

    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/users';
    const mockData = { id: 1, name: 'John Doe' };
    mockAxiosInstance.get.mockResolvedValue({ data: mockData });

    await throttledGetDataFromApi(relativePath);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = '/posts';
    const mockData = [{ id: 1, title: 'Post Title' }];
    mockAxiosInstance.get.mockResolvedValue({ data: mockData });

    const response = await throttledGetDataFromApi(relativePath);

    expect(response).toEqual(mockData);
  });
});