// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  let createMock: jest.MockedFunction<typeof axios.create>;
  let axiosClient: AxiosInstance;

  beforeEach(() => {
    createMock = jest.fn();
    axiosClient = {
      get: jest.fn().mockResolvedValue({ data: {} }),
    } as unknown as AxiosInstance;
    createMock.mockReturnValue(axiosClient as AxiosInstance);
    (axios.create as jest.MockedFunction<typeof axios.create>) = createMock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const relativePath = '/users';
    const responseData = { name: 'John Doe' };
    (axiosClient.get as jest.Mock).mockResolvedValueOnce({
      data: responseData,
    });

    const result = await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({ baseURL });
    expect(axiosClient.get).toHaveBeenCalledWith(relativePath);
    expect(result).toEqual(responseData);
  });
  test('should perform request to correct provided url', async () => {
    // Write your test here
  });

  test('should return response data', async () => {
    // Write your test here
  });
});
