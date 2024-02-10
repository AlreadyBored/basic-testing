// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should create instance with provided base url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn(() => ({ data: {} })),
    });
    await throttledGetDataFromApi('/users/1');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    const responseData = { example: 'data' };
    (axios.get as jest.Mock).mockResolvedValue({ data: responseData });
    await throttledGetDataFromApi('/users/1');
    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users/1',
    );
  });

  test('should return response data', async () => {
    // Write your test here
  });
});
