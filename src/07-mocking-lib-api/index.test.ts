import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const mockedResponse = { data: 'mocked data' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const relativePath = '/posts';
    const axiosInstance = {
      get: jest.fn().mockResolvedValue(mockedResponse),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosInstance);
    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    //
  });

  test('should return response data', async () => {
    const relativePath = '/posts';
    const axiosInstance = {
      get: jest.fn().mockResolvedValue(mockedResponse),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosInstance);
    const response = await throttledGetDataFromApi(relativePath);

    expect(response).toEqual(mockedResponse.data);
  });
});
