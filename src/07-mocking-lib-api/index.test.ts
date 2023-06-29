import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as unknown as jest.Mocked<typeof axios>;

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Andrew' },
];

beforeAll(() => {
  jest.useFakeTimers();
});

beforeEach(() => {
  mockedAxios.create = jest.fn(() => mockedAxios);
  mockedAxios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: users }),
  );
});

afterEach(() => {
  jest.advanceTimersByTime(5000);
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/users');
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/users');
    expect(mockedAxios.get).toHaveBeenCalledWith('/users');
  });

  test('should return response data', async () => {
    mockedAxios.get.mockResolvedValueOnce(users);
    const result = await throttledGetDataFromApi('/users');
    expect(result).toEqual(users);
  });
});
