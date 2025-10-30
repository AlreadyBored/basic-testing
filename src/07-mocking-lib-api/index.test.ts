// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.useFakeTimers();

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url and perform GET', async () => {
    const fakeData = { title: 'test' };
    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: fakeData }),
    } as any);

    throttledGetDataFromApi('/posts/1');
    jest.runAllTimers();

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: 'result' });

    mockedAxios.create.mockReturnValue({
      get: getMock,
    } as any);

    throttledGetDataFromApi('/comments/3');
    jest.runAllTimers(); // Принудительно вызываем throttle

    expect(getMock).toHaveBeenCalledWith('/comments/3');
  });

  test('should return response data', async () => {
    const responseData = { name: 'Test user' };

    const getMock = jest.fn().mockResolvedValue({ data: responseData });

    mockedAxios.create.mockReturnValue({
      get: getMock,
    } as any);

    const resultPromise = throttledGetDataFromApi('/users/5');
    jest.runAllTimers();

    const result = await resultPromise;
    expect(result).toEqual(responseData);
  });
});
