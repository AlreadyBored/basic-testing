import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('lodash', () => ({
  throttle: (func: unknown) => func,
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    mockedAxios.create.mockImplementation(() => mockedAxios);
    mockedAxios.get.mockResolvedValue({ data: 'response data' });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should create instance with provided base url', async () => {
    throttledGetDataFromApi('relativePath');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('correct provided url');
    expect(axios.get).toHaveBeenCalledWith('correct provided url');
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('relativePath');
    expect(result).toBe('response data');
  });
});