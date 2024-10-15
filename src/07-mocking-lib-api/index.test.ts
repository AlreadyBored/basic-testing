import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe(throttledGetDataFromApi.name, () => {
  const axiosClientMock = {
    get: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (axios.create as jest.Mock).mockReturnValue(axiosClientMock);
  });

  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';

    const axiosClientMock = {
      defaults: { baseURL },
    };

    (axios.create as jest.Mock).mockReturnValue(axiosClientMock);
    const axiosClient = axios.create({ baseURL });

    expect(axiosClient.defaults.baseURL).toBe(baseURL);
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts';
    const mockData = [{ id: 1, title: 'Post 1' }];

    (axiosClientMock.get as jest.Mock).mockResolvedValue({ data: mockData });

    await throttledGetDataFromApi(relativePath);

    expect(axiosClientMock.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = '/posts';
    const mockData = [{ id: 1, title: 'Post 1' }];

    (axiosClientMock.get as jest.Mock).mockResolvedValue({ data: mockData });

    const responseData = await throttledGetDataFromApi(relativePath);

    expect(responseData).toEqual(mockData);
  });
});
