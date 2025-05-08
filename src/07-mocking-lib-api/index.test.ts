import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.useFakeTimers();

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const relativePath = 'path/1';

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should create instance with provided base url', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'mock data' }),
    };

    const spyAxiosCreate = jest
      .spyOn(axios, 'create')
      .mockReturnValue(mockAxiosInstance as unknown as AxiosInstance);
    throttledGetDataFromApi(relativePath);

    expect(spyAxiosCreate).toHaveBeenLastCalledWith({ baseURL: baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const responseMock = { data: 'Test Data' };
    const getMock = {
      get: jest.fn().mockResolvedValue(responseMock),
    };
    const createMock = jest.fn().mockReturnValue(getMock);
    axios.create = createMock;
    throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(axios.create).toHaveBeenCalledWith({
      baseURL,
    });
    expect(getMock.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const responseMock = { data: 'Test Data' };
    const getMock = {
      get: jest.fn().mockResolvedValue(responseMock),
    };
    const createMock = jest.fn().mockReturnValue(getMock);
    axios.create = createMock;
    throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toEqual(responseMock.data);
  });
});

afterAll(() => {
  jest.useRealTimers();
});
