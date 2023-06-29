import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});
const mockedAxios = axios as unknown as jest.Mocked<typeof axios>;

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Andrew' },
];

beforeEach(() => {
  mockedAxios.create = jest.fn(() => mockedAxios);
  mockedAxios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: users }),
  );
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
