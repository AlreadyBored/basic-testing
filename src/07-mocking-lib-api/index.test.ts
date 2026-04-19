import axios from 'axios';
import { throttledGetDataFromApi } from './index';

// bypass lodash throttle so every call goes through (no time-based skipping)
jest.mock('lodash', () => ({
  ...jest.requireActual<typeof import('lodash')>('lodash'),
  throttle: jest.fn((fn: unknown) => fn),
}));

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });

    await throttledGetDataFromApi('/todos/1');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });

    await throttledGetDataFromApi('/todos/1');

    expect(mockGet).toHaveBeenCalledWith('/todos/1');
  });

  test('should return response data', async () => {
    const responseData = { id: 1, title: 'Test todo' };
    const mockGet = jest.fn().mockResolvedValue({ data: responseData });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });

    const result = await throttledGetDataFromApi('/todos/1');

    expect(result).toEqual(responseData);
  });
});
