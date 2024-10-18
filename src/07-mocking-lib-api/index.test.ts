import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: jest.fn((fn) => fn), 
}));

describe('throttledGetDataFromApi', () => {
  let mockAxiosClient: any;

  beforeEach(() => {
    mockAxiosClient = { get: jest.fn() };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosClient);
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test('should create instance with provided base url', async () => {
    const relativePath = '/posts/1';
    const mockResponseData = { id: 1, title: 'Post Title' };
    mockAxiosClient.get.mockResolvedValueOnce({ data: mockResponseData });
    await throttledGetDataFromApi(relativePath);
    expect(axios.create).toHaveBeenCalledWith({ baseURL: 'https://jsonplaceholder.typicode.com' });
    });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts/1';
    const mockResponseData = { id: 1, title: 'Post Title' };
    mockAxiosClient.get.mockResolvedValueOnce({ data: mockResponseData });
    await throttledGetDataFromApi(relativePath);
    expect(mockAxiosClient.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = '/posts/1';
    const mockResponseData = { id: 1, title: 'Post Title' };
    mockAxiosClient.get.mockResolvedValueOnce({ data: mockResponseData });
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toEqual(mockResponseData);
  });
});
