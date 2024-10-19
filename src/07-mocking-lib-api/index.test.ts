import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((callback) => callback),
}));

const PATH = '/some/path';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    (axios.create as jest.Mock).mockReturnValue({ get: jest.fn });

    await throttledGetDataFromApi(PATH);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getFuu = jest.fn((path) => path);
    (axios.create as jest.Mock).mockReturnValue({ get: getFuu });

    await throttledGetDataFromApi(PATH);

    expect(getFuu).toHaveBeenCalledWith(PATH);
  });

  test('should return response data', async () => {
    const DATA = 'some data';
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn(() => ({ data: DATA })),
    });

    const result = await throttledGetDataFromApi(PATH);

    expect(result).toBe(DATA);
  });
});
